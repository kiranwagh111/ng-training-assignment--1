import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskServiceService } from '../services/task-service.service';
import { TaskUtilityServiceService } from '../services/task-utility-service.service';
import { UserServiceService } from '../services/user-service.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  @Input() taskId!: number; 
  @Output() taskUpdated = new EventEmitter<any>();

  taskForm!: FormGroup;
  users: any;
  statuses: string[] = [];
  priorities: string[] = [];
  constructor(private fb: FormBuilder,private userService:UserServiceService,private taskUtility:TaskUtilityServiceService,private taskService:TaskServiceService) { 
  
  }
  ngOnInit(): void {
    this.createForm();
    console.log(this.taskId);
   
      this.statuses = this.taskUtility.getStatuses();
      this.priorities = this.taskUtility.getPriorities();
      this.userService.getUsers().subscribe(data =>{
        this.users = data;
      })
     
      this.fetchTask();
    
    
  }

  createForm(){
    this.taskForm = this.fb.group({
      assignedTo: [, Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  fetchTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(
      (task: Task) => {
        console.log(task);
        this.taskForm.patchValue({
          assignedTo:task.userId,
          status:task.status,
          dueDate:task.dueDate,
          priority:task.priority,
          comments:task.comments
          
        })
      },
      (error) => {
        console.error('Error fetching task:', error);
      }
    );
  }

  updateTask() {
    if (this.taskForm.valid) {
      const { assignedTo, ...taskFormValues } = this.taskForm.value;
    const user = this.users.find((u: { id: any; }) => u.id === assignedTo);

    let updatedTask: Task = {
      id: Date.now(), 
      userId: assignedTo, 
      assignedTo: user?.name || '', 
      ...taskFormValues 
    };
   

      this.taskService.editTask(updatedTask).subscribe(
        (task: Task) => {
          this.taskUpdated.emit(); 
          this.closeModal();
        },
        error => {
          console.error('Error updating task:', error);
        }
      );
    }
  }
 
  closeModal() {
    const modal = document.getElementById('editTaskModal') as HTMLElement;
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
