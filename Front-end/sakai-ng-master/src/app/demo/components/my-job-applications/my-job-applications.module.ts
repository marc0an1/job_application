import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyJobApplicationsComponent } from './my-job-applications.component';
import { MyJobApplicationsRoutingModule } from './my-job-applications-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MyJobApplicationsRoutingModule,
    MyJobApplicationsComponent,  // Import the standalone component here
    DropdownModule,
    DataViewModule,
    FormsModule
  ]
})
export class MyJobApplicationsModule { }
