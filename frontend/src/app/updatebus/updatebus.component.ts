import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BusService } from '../services/bus.service';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-updatebus',
  templateUrl: './updatebus.component.html',
  styleUrls: ['./updatebus.component.css']
})
export class UpdatebusComponent implements OnInit {

 constructor(private busservice: BusService, private route: ActivatedRoute, private router: Router) { }
  id: any;
  bookings : any[];
  buses: any[];
  cities: any[];

  ngOnInit(): void {

      this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
        });
       this.busservice.getBus(this.id)
        .subscribe(bus=>{ 
         this.buses=bus;
        // console.log(" get bus  from data base" , this.buses);
        });
        this.busservice.getCities().subscribe(data=>{
          this.cities = data;
        })
        

     
  }

  onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    let  bus = {
           id: this.buses[0].id,
           busnumber: formValue.busnumber,
           busdescription: formValue.busdescription,
           fromcity: formValue.fromcity,
           tocity: formValue.tocity,
           departuretime: formValue.departuretime,
           totalseats: formValue.totalseats,
           fare: formValue.fare

        };
    this.busservice.updateBus(bus).subscribe(()=>{
         this.router.navigate(['adminpage']);
         },
          err=>{
         console.log(err);
       });

  }
}

