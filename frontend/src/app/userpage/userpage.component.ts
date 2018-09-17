import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl:  './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  firstname:any;
 lastname:any;

 fromcity: String;
 tocity: String;
 doj: any;
 cities: any[];
 buses: any[];
 


  constructor(
    private authservice:AuthService,
     private busservice:BusService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  OnSearchSubmit()
  {
    
   //console.log(this.fromcity);
  // console.log(this.tocity); 
  
    var d = new Date();
    var d1 =  new Date(this.doj); 
    console.log(d);
    console.log(d1);
    if(d1<d)
    {
       this.flashMessage.show('Date should not be in past.', {
      cssClass:'alert-danger',
      timeout: 3000
    });
    return false;
    }
    if(this.fromcity==this.tocity)
    {
        this.flashMessage.show('From city and To city can not be same.', {
      cssClass:'alert-danger',
      timeout: 3000
    });
    return false;
    }
    var x =0;
    for(var i =0;i<this.buses.length;i++)
    {
      if(this.buses[i].fromcity==this.fromcity && this.buses[i].tocity==this.tocity)
      {
        x++;
      }
    }
    if(x==0)
    {
        this.flashMessage.show('There is no buses between these routes', {
      cssClass:'alert-danger',
      timeout: 3000
    });
    return false;
    }

    this.router.navigate(['/busdetails',this.fromcity,this.tocity,this.doj]);
  
  }

  ngOnInit() {
  

     this.authservice.getprofile().subscribe(profile=>{
    
       this.firstname = profile.user.firstname;
        this.lastname = profile.user.lastname;
       
         
    
    },
    err =>{
        if(this.firstname==undefined)
        this.firstname="Guest";
        if(this.lastname==undefined)
        this.lastname="User";
      console.log(err);
      return false;
    }
    );
   

    this.busservice.getCities().subscribe(data=>{
      this.cities = data;
    })
    this.busservice.getBuses().subscribe(data=>{
      this.buses = data;
    })

    $("#myCarousel").carousel({
         interval : 3000
     });
  }
  OnLogout()
  {
   this.authservice.logout();
   this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 1000
    });
    this.router.navigate(['/']);
    return false;
  }

 

  

}
