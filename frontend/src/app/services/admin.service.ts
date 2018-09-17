import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  private isAdminLoggedIn;
  public username;

  constructor() { 
  	this.isAdminLoggedIn = false;
  }

  setAdminLoggedIn() {
        localStorage.setItem("username", "admin");
  	//this.isAdminLoggedIn = true;
   // this.username = 'admin';
  }

  getAdminLoggedIn() {
    if(localStorage.getItem('username')=='admin')
    return true;
  	//return this.isAdminLoggedIn;
  }

}