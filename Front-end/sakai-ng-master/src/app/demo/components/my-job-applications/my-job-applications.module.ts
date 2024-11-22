import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyJobApplicationsComponent } from './my-job-applications.component';
import { MyJobApplicationsRoutingModule } from './my-job-applications-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'; // Import DialogModule
import { CalendarModule } from 'primeng/calendar'; // Import CalendarModule
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [MyJobApplicationsComponent],
  imports: [
    CommonModule,
    MyJobApplicationsRoutingModule,
    //MyJobApplicationsComponent,  // Import the standalone component here
    DropdownModule,
    DataViewModule,
    FormsModule,
    DialogModule,
    CalendarModule,
    ToastModule
  ]
})
export class MyJobApplicationsModule { }
