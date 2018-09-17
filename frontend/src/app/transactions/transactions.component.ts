import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  bookings: any[]

  constructor(
    private busservice: BusService,
  ) { }

  ngOnInit() {
    this.busservice.getBookings().subscribe(data=>{

      this.bookings = data;
     }
    
    )
  }


}
