import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 // user:any[];
 firstname:any;
 lastname:any;
 email:any;
 mobile:any;

  constructor(
    private authservice:AuthService,

  ) { }

  ngOnInit() {
    this.authservice.getprofile().subscribe(profile=>{
      this.email = profile.user.email;
       this.firstname = profile.user.firstname;
        this.lastname = profile.user.lastname;
         this.mobile = profile.user.mobile;
      console.log(this.firstname);
    },
    err =>{
      console.log(err);
      return false;
    }
    );
     if(this.firstname==undefined)
        this.firstname="Guest";
        if(this.lastname==undefined)
        this.lastname="User";
  }

}
