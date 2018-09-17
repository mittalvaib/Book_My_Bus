import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SupportComponent } from './support/support.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { LoginComponent } from './login/login.component';
import { AddbusComponent } from './addbus/addbus.component'
import { UserpageComponent } from './userpage/userpage.component';
import { UpdatebusComponent } from './updatebus/updatebus.component';
import { BusdetailsComponent } from './busdetails/busdetails.component';
import { BookseatsComponent } from './bookseats/bookseats.component';
import { ProfileComponent } from './profile/profile.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CitiesComponent } from './cities/cities.component';




import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [

{  path: '', component: DashboardComponent }, // Default Route,
    
    {
        path: 'register', component: RegisterComponent // Register route
    },
    {
        path: 'admin-login', component: AdminLoginComponent 
    },
    {
        path: 'support', component: SupportComponent 
    },
    {
        path: 'adminpage',
        canActivate: [AuthGuard], 
        component: AdminpageComponent

    },
     {
        path: 'login', component: LoginComponent 
    },
     {
        path: 'addbus', 
        canActivate: [AuthGuard],
        component:  AddbusComponent
    },
     {
        path: 'userpage', 
        //canActivate: [AuthGuard],
        component:  UserpageComponent
    },
    {
        path: 'updatebus/:id', 
        canActivate: [AuthGuard],
        component:  UpdatebusComponent
    },
      {
        path: 'busdetails/:fromcity/:tocity/:doj', 
        //canActivate: [AuthGuard],
        component:  BusdetailsComponent
    },
     {
        path: 'bookseats/:id/:doj', 
        //canActivate: [AuthGuard],
        component:  BookseatsComponent
    },
    {
        path: 'profile', 
        //canActivate: [AuthGuard],
        component:  ProfileComponent
    },
     {
        path: 'bookinghistory', 
        //canActivate: [AuthGuard],
        component:  BookinghistoryComponent
    },
    {
        path: 'transactions', 
        canActivate: [AuthGuard],
        component:  TransactionsComponent
    },
    {
        path: 'cities', 
        canActivate: [AuthGuard],
        component:  CitiesComponent
    },
     
  
       



];
export const routing = RouterModule.forRoot(appRoutes);