import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private aaAuth:AuthService, private userSer:UserService) { }

  canActivate():Observable<boolean>{
    return this.aaAuth.appUser$
    .map(appUser =>appUser.Admin);   
  }
}
