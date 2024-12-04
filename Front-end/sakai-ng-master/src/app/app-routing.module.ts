import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './demo/components/auth/auth.guard'; // Adjust the path as necessary
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' }, // Redirect context root to login
  { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
  { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
      { path: 'my-job-applications', loadChildren: () => import('./demo/components/my-job-applications/my-job-applications.module').then(m => m.MyJobApplicationsModule) },
      { path: 'my-calendar', loadChildren: () => import('./demo/components/my-calendar/my-calendar.module').then(m => m.MyCalendarModule) },
      { path: 'edit-user', loadChildren: () => import('./demo/components/edit-user/edit-user.module').then(m => m.EditUserModule), canActivate: [AuthGuard] }, // New route for Edit User
      { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule), canActivate: [AuthGuard] },
      { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule), canActivate: [AuthGuard] },
      { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule), canActivate: [AuthGuard] },
      { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule), canActivate: [AuthGuard] },
      { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] }
    ]
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' } // Redirect unknown paths to NotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
