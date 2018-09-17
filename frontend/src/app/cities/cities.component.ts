import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities:any[];
  city:any;
  j:any;
  x:any;
  bookings:any[];
   cityname:any;
  citydescription:any;
   id:any;
   cit:any[];
   delid:any;


  constructor(
    private busservice:BusService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() : void {
    this.busservice.getCities().subscribe(data=>{
      this.cities = data;
    })
    this.busservice.getBookings().subscribe(data=>{
      this.bookings = data;
    })
    
       


  }
   OnAddCity(){
  const city = {
  cityname: this.cityname,
  citydescription: this.citydescription,
    }
   if(city.cityname == undefined || city.citydescription == undefined ){
      alert('Please fill in all fields');
      return false;
    } 
    
    
    //add bus
     this.busservice.addCity(city).subscribe(data => {
      if(data.success){
         $('#addcity').modal('hide');
          window.location.reload();
       // this.router.navigate(['/cities']);
      }
    });
    

}


   updatecity(id: any,city: any)
  {
    this.j =0;
   

     
      for(var i = 0;i<this.bookings.length;i++)
   {
     if(city==this.bookings[i].fromcity || city==this.bookings[i].tocity)
     {

      alert('Already booked by the user');
      this.j =1;
      return false;
    //  break;
      
     }
   }
  
  
   if(this.j==0)
    this.busservice.getCity(id).subscribe(data=>{
          this.cit = data;

        // console.log(this.cities);
        })
        $('#editcity').modal('show');

  }
      onSubmit(formValue: any){
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    let  city = {
           id: this.cit[0].id,
           cityname: formValue.cityname,
           citydescription: formValue.citydescription,

        };
    this.busservice.updateCity(city).subscribe(()=>{
           $('#editcity').modal('hide');
          window.location.reload();
         },
          err=>{
         console.log(err);
       });

  }
   deletecity(id : any,city: any){
    this.x = 0;

      for(var i = 0;i<this.bookings.length;i++)
   {
     if(city==this.bookings[i].fromcity || city==this.bookings[i].tocity)
     {
        //this.flashMessage.show('This Bus is already booked by the user', {cssClass: 'alert-danger', timeout: 3000});
     alert('Already booked by the user');
      this.x =1;
      break;
      
     }
   }
    if(this.x==0)
    {
       this.delid=id;
       $('#deletecity').modal('show');
  
    }
  }
  delete()
  {
      this.busservice.deleteCity(this.delid).subscribe();

     this.busservice.getCities()
    .subscribe( data=>{
        this.cities=data;
    });
      $('#deletecity').modal('hide');
          window.location.reload();

  }

}
