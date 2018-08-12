import { Component } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(userService:UserService,authService:AuthService){
    authService.user.subscribe(user=>{
      if(!user) return
      userService.save(user);
    })
  }
}
