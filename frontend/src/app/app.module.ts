import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
//import { AngularFireAuth } from 'angularfire2/auth';

import { HttpModule } from '@angular/http';

import { ValidateService } from './services/validate.service';
import { routing }  from './app.routing';
import { AppComponent } from './app.component';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SupportComponent } from './support/support.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AdminService } from './services/admin.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { AddbusComponent } from './addbus/addbus.component';
import { BusService } from './services/bus.service';
import { UserpageComponent } from './userpage/userpage.component';
import { UpdatebusComponent } from './updatebus/updatebus.component';
import { BusdetailsComponent } from './busdetails/busdetails.component';
import { BookseatsComponent } from './bookseats/bookseats.component';
import { ProfileComponent } from './profile/profile.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CitiesComponent } from './cities/cities.component';

import { AfService } from './services/af.service';
import * as $ from 'jquery';
import * as bootstrap from "bootstrap";

import { CommonModule } from '@angular/common';







@NgModule({
  declarations: [
    AppComponent,
    
    DashboardComponent,
    RegisterComponent,
    AdminLoginComponent,
    SupportComponent,
    AdminpageComponent,
    LoginComponent,
    AddbusComponent,
    UserpageComponent,
    UpdatebusComponent,
    BusdetailsComponent,
    BookseatsComponent,
    ProfileComponent,
    BookinghistoryComponent,
    TransactionsComponent,
    CitiesComponent,
  

    
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    
     CommonModule
    //AngularFireAut
  ],
  providers: [AdminService,AuthGuard, ValidateService,  FlashMessagesService, AuthService, BusService,UserpageComponent,AfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
