import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BusService {

  bus: any;
 public newbusSubject = new Subject<any>();

  constructor(private http:Http) { }

   addsome(data)
   {
    this.newbusSubject.next(data);
   }

    addBus(bus){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/admin/addbus', bus,{headers: headers})
      .map(res => res.json());
  }
  getBuses(){
     return this.http.get('http://localhost:3000/admin/buses')
     .map(res=> res.json());
  }
  getBus(id: any){
     return this.http.get('http://localhost:3000/admin/'+id)
     .map(res=> res.json());
  }
    getCity(id: any){
     return this.http.get('http://localhost:3000/admin/city/'+id)
     .map(res=> res.json());
  }


  deleteBus(id: any){
    return this.http.delete('http://localhost:3000/admin/deletebus/'+id)
    .map(res=>res.json());
  }
   deleteCity(id: any){
    return this.http.delete('http://localhost:3000/admin/deletecity/'+id)
    .map(res=>res.json());
  }
  getUserBus(fromcity: any,tocity: any )
  {
     return this.http.get('http://localhost:3000/users/'+fromcity+'&'+tocity)
     .map(res=> res.json());
  }
 
  updateBus(bus: any) {
   console.log(bus);
   var headers= new Headers();
   headers.append('Content-Type', 'application/json');
   return this.http.put('http://localhost:3000/admin/updatebus/'+bus.id, JSON.stringify(bus), {headers: headers})
   .map(res=>res.json());
  }
  addBooking(booking)
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/booking/addbooking', booking,{headers: headers})
      .map(res => res.json());
  }
  getBookings()
  {
    return this.http.get('http://localhost:3000/booking/getbooking/bookings')
     .map(res=> res.json());
  }

   getUserBookings(email:any)
  {
    return this.http.get('http://localhost:3000/booking/'+email)
     .map(res=> res.json());
  }
  addCity(city){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/admin/addcity', city,{headers: headers})
      .map(res => res.json());
  }
  getCities(){
     return this.http.get('http://localhost:3000/admin/cities/cities')
     .map(res=> res.json());
  }

  updateCity(city: any) {
   console.log(city);
   var headers= new Headers();
   headers.append('Content-Type', 'application/json');
   return this.http.put('http://localhost:3000/admin/updatecity/'+city.id, JSON.stringify(city), {headers: headers})
   .map(res=>res.json());
  }
  

}
