import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { TaskUtilityServiceService } from '../services/task-utility-service.service';
import { TaskServiceService } from '../services/task-service.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<any>();
  taskForm!: FormGroup;
  users: any;
  statuses: string[] = [];
  priorities: string[] = [];
  constructor(private fb: FormBuilder,private userService:UserServiceService,private taskUtility:TaskUtilityServiceService,private taskService:TaskServiceService) { 
  
  }

  ngOnInit(): void {

    this.statuses = this.taskUtility.getStatuses();
    this.priorities = this.taskUtility.getPriorities();



    this.userService.getUsers().subscribe(data =>{
      this.users = data;
    })


   this.createForm();
  }

createForm(){
  this.taskForm = this.fb.group({
    assignedTo: [null, Validators.required],
    status: ['', Validators.required],
    dueDate: ['', Validators.required],
    priority: ['', Validators.required],
    comments: ['', Validators.required],
  });
}
addTask() {
  if (this.taskForm.valid) {
    const { assignedTo, ...taskFormValues } = this.taskForm.value;
    const user = this.users.find((u: { id: any; }) => u.id === assignedTo);

    let newTask: Task = {
      id: Date.now(), 
      userId: assignedTo, 
      assignedTo: user?.name || '', 
      ...taskFormValues 
    };
    this.taskService.addTask(newTask).subscribe(
      response => {
        console.log('Task added:', response);
        this.taskForm.reset(); 
        this.taskAdded.emit();
        this.closeModal(); 
        this.taskForm.reset(); 
      },
      error => {
        console.error('Error adding task:', error);
      }
    );
  }
}

  closeModal() {
   
    const modal = document.getElementById('addTaskModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove(); 
      }
     
    }
  }



}
