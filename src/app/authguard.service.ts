import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate , RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private auth:AuthService, private route:Router) { }
  canActivate(route, state:RouterStateSnapshot ){
    return this.auth.user.map(user=>{
      if(user) return true;

      this.route.navigate(['/login'],{ queryParams: { returnUrl:state.url}});
      return false;
    });
    
  }
}
