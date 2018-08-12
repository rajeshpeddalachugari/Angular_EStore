import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { shoppingCart } from '../models/shopping-Cart';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser : AppUser;
  shippingCardtItemQuantity : number;
 
  constructor(public auth:AuthService,private shoppingCartService : ShoppingCartService) { 
    
  }

 async ngOnInit() {
    this.auth.appUser$.subscribe(user => this.appUser = user);
   console.log(this.appUser);
    // let cart = await this.shoppingCartService.getCart();
    
    // cart.subscribe(cart=>{
    //   this.shippingCardtItemQuantity = 0;
    //   for(let productId in cart.payload.val().items){
    //     this.shippingCardtItemQuantity += cart.payload.val().items[productId].quantity; 
    //   }
    // })

    let cart$ = await this.shoppingCartService.totalQty();
    cart$.subscribe(count=>{
      this.shippingCardtItemQuantity = count;
    })

 
    
  }
  logout(){
    this.auth.logout();
  }

}
