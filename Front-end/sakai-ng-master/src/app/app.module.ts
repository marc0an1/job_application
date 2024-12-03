import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './demo/components/auth/auth.service';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
//import { MyJobApplicationsComponent } from './demo/components/my-job-applications/my-job-applications.component'; // Import standalone component
import { MyJobApplicationsModule } from './demo/components/my-job-applications/my-job-applications.module'; // Adjust the path as needed
import { MyCalendarComponent } from './demo/components/my-calendar/my-calendar.component'; // Ensure this path is correct and the file exists
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { FullCalendarModule } from '@fullcalendar/angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
//import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({ 
    declarations: [
        AppComponent, 
        NotfoundComponent],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        AppLayoutModule,
        FormsModule,
        AppRoutingModule,
        CalendarModule, // Add CalendarModule to imports
        DropdownModule, // Add DropdownModule to imports
        InputTextModule, // Add InputTextModule to imports
        DialogModule,
        ButtonModule,
        InputGroupModule, // Add InputGroupModule to imports
        FullCalendarModule, // Add FullCalendarModule to imports
        MyJobApplicationsModule], providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
