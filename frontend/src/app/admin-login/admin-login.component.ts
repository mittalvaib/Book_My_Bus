import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private router:Router,
    private admin: AdminService
  ) { }

  ngOnInit() {
  }

  loginadmin(e)
  {
    e.preventDefault();
    console.log(e);
    var username = e.target.elements[0].value;
  	var password = e.target.elements[1].value;
    if(username == 'admin' && password == 'admin') {
     
     this.admin.setAdminLoggedIn();
  		this.router.navigate(['adminpage']);
  	}
    else{
      alert("Admin credentials are wrong");
    }

    
  }

}
