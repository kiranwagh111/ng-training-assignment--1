import { Component, DoCheck, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { TaskServiceService } from '../services/task-service.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {



searchString!:string

tasks: any[] = []
selectedTaskId!: number
  constructor(private taskService:TaskServiceService) { }
  
  

  ngOnInit(): void {
    this.getTask();
  }

  getTask(){
    this.taskService.getTasks().subscribe(data =>{
      this.tasks = data;
    })
  }

  openModal() {
    this.closeAllModals(); 
    const modal = document.getElementById('addTaskModal') as HTMLElement;
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    this.addBackdrop();
  }

  isEditTask=false
  openEditModal(task: Task): void {
    this.isEditTask=true



    this.closeAllModals(); 
    this.selectedTaskId = task.id; 


    setTimeout(() => {
      const modal = document.getElementById('editTaskModal') as HTMLElement;
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        this.addBackdrop();
      } else {
        console.error('Modal not found');
      }
    }, 0);
   

  }
  

  
  onTaskAdded() {
    this.taskService.getTasks().subscribe(data =>{
      this.tasks = data;
    })
    
  }
  onTaskUpdated(){
    console.log("Event ocuured")
    this.taskService.getTasks().subscribe(data =>{
      this.tasks = data;
    })
    this.isEditTask=false
  }

  closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach((modal: Element) => {
      const modalElement = modal as HTMLElement; 
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    });
  
    
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
  
  addBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);
  }
  
  
  
  deleteTask(id:number ) {
    const isConfirmed = confirm('Are you sure you want to delete this task?');
    if (isConfirmed) {
     
      this.taskService.deleteTask(id).subscribe(() => {
        this.getTask(); 
      });
    }
    }
}
