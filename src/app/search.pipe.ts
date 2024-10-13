import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './models/task';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: Task[], searchText: string): Task[] {
    if (!tasks || !searchText) {
      return tasks; 
    }
    
    const lowerCaseSearchText = searchText.toLowerCase();
    
    // Filter tasks based on name or description
    return tasks.filter(task => 
      (task.assignedTo && task.assignedTo.toLowerCase().includes(lowerCaseSearchText)) ||
      (task.status && task.status.toLowerCase().includes(lowerCaseSearchText))
    );
  }

}
