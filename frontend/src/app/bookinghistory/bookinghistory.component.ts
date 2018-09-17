import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {
  email : any;
  booking: any[];

  constructor(
    private busservice:BusService,
    private authservice:AuthService
  ) { }

  ngOnInit() {
    this.authservice.getprofile().subscribe(data=>{
     this.email = data.user.email;
    console.log(this.email);
    this.busservice.getUserBookings(this.email).subscribe(booking=>{
      this.booking = booking;
      console.log(this.booking);
    });
    }
    );
     

  }


}
