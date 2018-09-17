import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BusService } from '../services/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbus',
  templateUrl: './addbus.component.html',
  styleUrls: ['./addbus.component.css']
})
export class AddbusComponent implements OnInit {
  buses: any[];
  cities: any[];
  id:any;
    busnumber: Number;
  busdescription: String;
  fromcity: String;
  tocity: String;
  departuretime: String;
  totalseats: String;
  fare:Number;

constructor(
  private flashMessage:FlashMessagesService,
   private busService:BusService,
    private router: Router
  ) { }

  ngOnInit() {
    this.busService.getBuses().subscribe(data=>{

      this.buses = data;
      
      this.id = this.buses[this.buses.length-1].id;
  
      
    })
    if(this.id==undefined)
    {
         this.id=0;
             console.log(this.id);
    }
    this.busService.getCities().subscribe(data=>{
      this.cities = data;
    })
  }
  OnAddBus(){
  const bus = {
    id:this.id+1,
        busnumber: this.busnumber,
  busdescription: this.busdescription,
  fromcity: this.fromcity,
  tocity: this.tocity,
  departuretime: this.departuretime,
  totalseats: this.totalseats,
  fare:this.fare
    }
   if(bus.busnumber == undefined || bus.busdescription == undefined || bus.fromcity == undefined || bus.tocity == undefined || bus.departuretime == undefined || bus.totalseats == undefined){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } 
    
    
    //add bus
     this.busService.addBus(bus).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Bus is registered', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/adminpage']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/addbus']);
      }
    });
    

}

}
