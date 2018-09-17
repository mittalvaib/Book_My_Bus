import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { BusService } from '../services/bus.service';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
busnumber:boolean=true;
busdescription:boolean=true;
fromcity:boolean=true;
tocity:boolean=true;
departuretime:boolean=true;
totalseats:boolean=true;
fare:boolean=true;
j:any;
x:any;
y:any;
Barchart:any;
delid:any;

buses: any[];
deletebuses: any[]=[];
bookings: any[];
cities: any[];

  constructor(
    private admin: AdminService,
    private busservice : BusService,
    private flashMessage:FlashMessagesService,
    private router: Router
  
  ) { }

  ngOnInit() {
      this.busservice.getCities().subscribe(data=>{
     this.cities = data;
       
   });
       
   this.busservice.getBookings().subscribe(data=>{
     this.bookings = data;
       
   })
    this.busservice.getBuses()
    .subscribe(buses=>
    {
        this.buses=buses;
    });
    //console.log(this.buses);
    this.busservice.getBookings().subscribe(data=>{
      this.bookings  = data;
    })
  }
  updatebus(id: any)
  {
    this.j =0;
   

     
      for(var i = 0;i<this.bookings.length;i++)
   {
     if(id==this.bookings[i].busid)
     {
        //this.flashMessage.show('This Bus is already booked by the user', {cssClass: 'alert-danger', timeout: 3000});
      alert('This Bus is already booked by the user');
      this.j =1;
      
     }
   }
  
  
   if(this.j==0)
   this.router.navigate(['/updatebus',id]);
  }
  deletebus(id : any){
    this.x = 0;

      for(var i = 0;i<this.bookings.length;i++)
   {
     if(id==this.bookings[i].busid)
     {
        //this.flashMessage.show('This Bus is already booked by the user', {cssClass: 'alert-danger', timeout: 3000});
     alert('This Bus is already booked by the user');
      this.x =1;
      
     }
   }
    if(this.x==0)
    {
       this.delid=id;
       $('#deletebus').modal('show');
   
    }
  }
  delete()
  {
     this.busservice.deleteBus(this.delid).subscribe();

     this.busservice.getBuses()
    .subscribe( buses=>{
        this.buses=buses;
    });
    $('#deletebus').modal('hide');
          window.location.reload();
  }





 onclick(){
   var chart={}
   
  
   for(var i=0;i<this.cities.length;i++)
   {
     chart[this.cities[i].cityname]=0;
   }
for(var i=0;i<this.bookings.length;i++)
   {
     chart[this.bookings[i].tocity]++;
   }


var sortable = [];
for (var key in chart) {
    sortable.push([key, chart[key]]);
}

sortable.sort(function(a, b) {
    return a[1] - b[1];
});
sortable.reverse();
var city=[];
var value=[];
city[0] = sortable[0][0];
city[1] = sortable[1][0];
city[2] = sortable[2][0];
city[3] = sortable[3][0];
city[4] = sortable[4][0];

value[0]=sortable[0][1];
value[1]=sortable[1][1];
value[2]=sortable[2][1];
value[3]=sortable[3][1];
value[4]=sortable[4][1];

this.Barchart=new Chart('barchart',{
 type:'bar',
 data:{
   labels:[city[0],city[1],city[2],city[3],city[4]],
   datasets:[{
     label:'#Top booked cities',
     data:[value[0],value[1],value[2],value[3],value[4]],
     backgroundColor:[
       'rgba(255,99,132,0.4)',
       'rgba(54,162,235,0.4)',
       'rgba(255,206,86,0.4)',
       'rgba(75,192,192,0.4)',
       'rgba(153,102,255,0.4)'
      
     ]
     
   }]
 }

})

 }

Onlogout()
{

 localStorage.removeItem("username");
}


}
