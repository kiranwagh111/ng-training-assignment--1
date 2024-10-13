import { TestBed } from '@angular/core/testing';

import { TaskUtilityServiceService } from './task-utility-service.service';

describe('TaskUtilityServiceService', () => {
  let service: TaskUtilityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskUtilityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
