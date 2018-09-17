import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BusService } from '../services/bus.service';
import { ValidateService } from '../services/validate.service';
import "rxjs/add/operator/map";
import { Router, ActivatedRoute, Params } from '@angular/router';


import { environment } from '../../environments/environment';




@Component({
  selector: 'app-bookseats',
  templateUrl: './bookseats.component.html',
  styleUrls: ['./bookseats.component.css']
})
export class BookseatsComponent implements OnInit {
 handler:any;
  
  id:any;
  busid:any;
  useremail:any;
  passenger1name:any;
  passenger2name:any;
  fromcity:any;
  tocity:any;
  departuretime:any;
  fare:any;
  quantity:any;
  totalfare:any;
  busnumber:any;
  doj:any;
  cardnumber:any;
  cvv:any;
  exp:any;
  x:any;




  constructor(private authservice: AuthService, private route: ActivatedRoute, private router: Router,
  private busservice: BusService,
  private flashMessage:FlashMessagesService, 
  private validateservice: ValidateService,
   private authService:AuthService
 
  
  ) { }
  

  ngOnInit(): void {
     this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://www.ebs.in/IPS/images/tabs_images/visa.png',
      locale: 'auto',
      currency:'inr',
        token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
  }
    });
    
     
    
       this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
            this.doj = params['doj'];
           // console.log(this.doj);
        });
       this.authservice.getprofile().subscribe(profile=>{
      this.useremail = profile.user.email;
     // console.log(profile.user.email);
    },
    err =>{
      console.log(err);
      return false;
    }
    ); 
    this.busservice.getBus(this.id).subscribe(data=>{
      this.fromcity = data[0].fromcity;
      this.tocity = data[0].tocity;
      this.departuretime = data[0].departuretime;
      this.fare = data[0].fare;
      this.busnumber=data[0].busnumber;
      this.busid = data[0].id;
      //console.log(this.fromcity);
    })

  }
  OnBook()
  {
    const booking = {
      
      busid: this.busid,
      useremail: this.useremail,
      doj: this.doj,
      fromcity: this.fromcity,
      tocity: this.tocity,
      departuretime: this.departuretime,
      fare: this.fare,
      passenger1name: this.passenger1name,
      passenger2name: this.passenger2name,
      quantity: this.quantity,
      totalfare: this.totalfare,
      busnumber: this.busnumber,
    }

    // Required fields
    if(this.passenger1name==undefined)
    {
      alert("Please fill passenger details");
      this.x=1;
      return false;
    }
    //console.log(booking.passenger1name);
    if(this.passenger2name==undefined)
    {
      booking.quantity = 1;
    }
    else
    {
      booking.quantity = 2;
    }
    booking.totalfare = booking.fare*booking.quantity;
       
      this.busservice.addBooking(booking).subscribe(data => {
      if(data.success){
          const send={
      email:this.useremail,
      message:"Your tickets have been succsessfully booked."
    }
      this.authService.sendmail(send).subscribe(data=>
        {
         
        });

          this.handler.open({
      name: 'Book My Bus',
      excerpt: 'Deposit Funds to Account',
      amount: booking.totalfare*100
    }); 
     
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/bookseats']);
      }
    });
   
  
    
  
    
   
  }



  }




