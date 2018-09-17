import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './services/admin.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private admin: AdminService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
  //	console.log('You are not authenticated');
     return this.admin.getAdminLoggedIn();
  }
}
