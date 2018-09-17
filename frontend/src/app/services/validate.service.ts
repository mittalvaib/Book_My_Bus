import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.mobile == undefined || user.password == undefined ){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
   validatemobile(mobile){
    const re =  /(7|8|9)\d{9}$/;
   
    return re.test(mobile);
  }
  validatecard(card){
    const re =  /(4|5)\d{15}$/;
   
    return re.test(card);
  }
    validatecvv(cvv){
    const re =  /([1-9])\d{2}$/;
   
    return re.test(cvv);
  }
}
