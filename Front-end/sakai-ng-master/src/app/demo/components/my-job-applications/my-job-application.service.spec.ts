import { TestBed } from '@angular/core/testing';

import { JobApplicationService } from './my-job-application.service';

describe('MyJobApplicationService', () => {
  let service: JobApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
