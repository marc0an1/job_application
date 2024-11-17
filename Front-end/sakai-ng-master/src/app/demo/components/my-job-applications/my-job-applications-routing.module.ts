import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyJobApplicationsComponent } from './my-job-applications.component';

const routes: Routes = [
  { path: '', component: MyJobApplicationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyJobApplicationsRoutingModule { }