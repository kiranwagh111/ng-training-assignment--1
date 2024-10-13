import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskUtilityServiceService {

  constructor() { }

  private statuses: string[] = ['Pending', 'In Progress', 'Completed', 'On Hold'];
  private priorities: string[] = ['Low', 'Medium', 'High', 'Critical'];

  getStatuses(): string[] {
    return this.statuses;
  }

  getPriorities(): string[] {
    return this.priorities;
  }
}
