import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-busdetails',
  templateUrl: './busdetails.component.html',
  styleUrls: ['./busdetails.component.css']
})
export class BusdetailsComponent implements OnInit {
  bookings: any[];
   buses: any[];
   doj: any;
    fromcity:any;
  tocity:any;
    busnumber:any;
   busdescription:any;
  departuretime:any;
  totalseats:any;
  fare:any;

  constructor(public busservice:BusService,private route: ActivatedRoute, private router: Router
    
  ) { }

  ngOnInit(): void {

    
   
    this.route.params.forEach((params: Params) => {
            this.fromcity = params['fromcity'];
            this.tocity = params['tocity'];
            this.doj = params['doj'];
            // console.log(this.fromcity);
            // console.log(this.tocity); 
        });
   
   this.busservice.getUserBus(this.fromcity,this.tocity)
    .subscribe(buses=>{
      //console.log("vsbuvs");
        this.buses=buses;
    });

    this.busservice.getBookings().subscribe(data=>{
     this.bookings = data;
     var j =0;
     for(var i =0;i<this.buses.length;i++)
     {
       for(var j =0;j<this.bookings.length;j++)
       {
         if(this.buses[i].id==this.bookings[j].busid && this.doj==this.bookings[j].doj)
         {
           this.buses[i].totalseats = this.buses[i].totalseats - this.bookings[j].quantity;
         }
       }
     }

    })
    
    
   
      

  }
  

}
