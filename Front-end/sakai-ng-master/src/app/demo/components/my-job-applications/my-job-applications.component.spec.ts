import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobApplicationsComponent } from './my-job-applications.component';

describe('MyJobApplicationsComponent', () => {
  let component: MyJobApplicationsComponent;
  let fixture: ComponentFixture<MyJobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyJobApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
