import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendarComponent } from './my-calendar.component';

const routes: Routes = [
  { path: '', component: MyCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCalendarRoutingModule { }