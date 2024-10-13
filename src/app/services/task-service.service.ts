import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }
 
  getTasks(): Observable<Task[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
  
  editTask(task: Task): Observable<Task> {
    return this.http.put<any>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<Task> {

    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
