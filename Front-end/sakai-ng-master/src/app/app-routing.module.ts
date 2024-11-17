import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { DashboardComponent } from './demo/components/dashboard/dashboard.component';
import { MyJobApplicationsComponent } from './demo/components/my-job-applications/my-job-applications.component';
import { MyCalendarComponent } from './demo/components/my-calendar/my-calendar.component';

// const routes: Routes = [
//     { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
//     // { path: 'dashboard', component: DashboardComponent},
//     // { path: 'my-job-applications', component: MyJobApplicationsComponent},
//     // { path: 'my-calendar', component: MyCalendarComponent},
//     {
//                 path: '', component: AppLayoutComponent,
//                 children: [
//                     { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
//                     //{ path: 'my-job-applications', loadChildren: () => import('./demo/components/my-job-applications/my-job-applications.module').then(m => m.MyJobApplicationsModule) },
//                     { path: 'my-calendar', loadChildren: () => import('./demo/components/my-calendar/my-calendar.module').then(m => m.MyCalendarModule) },
//                     { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
//                     { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
//                     { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
//                     { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
//                     { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
//                     { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
//                 ]
//             },
//             { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
//             { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
//             { path: 'notfound', component: NotfoundComponent },
//             { path: '**', redirectTo: '/notfound' },
// ];


// @NgModule({
//     imports: [
//         RouterModule.forRoot([
//             {
//                 path: '', component: AppLayoutComponent,
//                 children: [
//                     { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
//                     { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
//                     { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
//                     { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
//                     { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
//                     { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
//                 ]
//             },
//             { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
//             { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
//             { path: 'notfound', component: NotfoundComponent },
//             { path: '**', redirectTo: '/notfound' },
//         ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
//     ],
//     exports: [RouterModule]
// })

// export class AppRoutingModule {
// }

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'my-job-applications', loadChildren: () => import('./demo/components/my-job-applications/my-job-applications.module').then(m => m.MyJobApplicationsModule) },
            { path: 'my-calendar', loadChildren: () => import('./demo/components/my-calendar/my-calendar.module').then(m => m.MyCalendarModule) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
        ]
    },
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }