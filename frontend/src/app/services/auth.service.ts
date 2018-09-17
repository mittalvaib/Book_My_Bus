import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  send: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
      .map(res => res.json());
  }
   checkEmail(email) {
    return this.http.get('http://localhost:3000/users/checkEmail/' + email).map(res => res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }
   storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('http://localhost:3000/user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  getprofile()
  {
    let headers = new Headers();
    this.loadtoken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
      .map(res => res.json());

  }
  loadtoken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  loggedIn() {
    return tokenNotExpired();
  }
  sendmail(send)
  {
 let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/sendmail', send,{headers: headers})
      .map(res => res.json());
  }
  
}
