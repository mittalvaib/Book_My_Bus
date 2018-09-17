import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor( 
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    
  }
  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
    const send={
      email:this.email,
      message:"You are successfully logged in"
    }
    console.log(user.email);
    console.log(user.password);

    if((user.email==undefined || user.email=="") &&( user.password==undefined || user.password==""))
    {
       this.flashMessage.show('Please fill required fields', {
          cssClass: 'alert-danger',
          timeout: 3000});
          return false;
    }
    if(user.email==undefined || user.email=="")
    {
        this.flashMessage.show('Email is required', {
          cssClass: 'alert-danger',
          timeout: 3000});
          return false;
    }
    if(user.password==undefined)
    {
        this.flashMessage.show('Password is required', {
          cssClass: 'alert-danger',
          timeout: 3000});
          return false;
    }

    //User authentication
    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);

      if(data.success){
        this.authService.sendmail(send).subscribe(data=>{
          if(data.success){
            console.log("yes");
          }
        });
        this.authService.storeUserData(data.token, data.user);
       
        this.router.navigate(['/userpage']);
      } else {
       
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000});
        this.router.navigate(['login']);
      }
    });
  }
 

}
