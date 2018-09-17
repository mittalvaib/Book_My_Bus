import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname: String;
  lastname: String;
  email: String;
  mobile: String;
  password: String;
  

  constructor(private validateService: ValidateService, 
  private flashMessage:FlashMessagesService,
   private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   
  }

  OnRegisterSubmit(){
  const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
    
    }
    const send={
      email:this.email,
      message:"Welcome to book my bus. You have been successfully registered."
    }

    
    

// Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
  

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    //Validate Mobile
     if(!this.validateService.validatemobile(user.mobile)){
      this.flashMessage.show('Please use a valid Mobile Number', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

// Function to check if e-mail is taken
    // Function from authentication file to check if e-mail is taken
    this.authService.checkEmail(user.email).subscribe(data => {
      // Check if success true or false was returned from API
      if (!data.success) {
        this.flashMessage.show('Email is already taken',{cssClass: 'alert-danger', timeout: 3000}); // Return email as invalid
        return false;
      } 
      else
      {
       // Register user
      this.authService.registerUser(user).subscribe(data => {
      if(data.success){
         $('#myModal').modal('show');
        this.authService.sendmail(send).subscribe(data=>
        {
         
        });
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
   
      }
    });

    
    


}


}
