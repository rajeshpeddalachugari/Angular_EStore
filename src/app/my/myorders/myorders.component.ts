import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orders$;
  userId;
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

  //  this.authService.user.subscribe(user=>this.userId = user.uid)

  this.orders$ = authService.user.switchMap(u => orderService.getOrderByUser(u.uid));

  }

  ngOnInit() {
  }

}
