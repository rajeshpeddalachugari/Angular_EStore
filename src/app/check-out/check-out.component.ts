import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy { 
  shipping = {}; 
  cart$;
  order;
  userId:string;
  shoppingCartItemsQuantity : number;
  totalPrice : number;
  cartSubscription:Subscription;
  userSubscription:Subscription;
  orderItems = [];
  constructor(private shoppingCartService:ShoppingCartService,
    private orderService:OrderService,private router:Router,private Auth:AuthService){}

  async ngOnInit(){
    let cart = await this.shoppingCartService.getCart();
    this.cartSubscription = cart.subscribe(cart=>{
      this.cart$ = cart.payload.val();
      this.orderItems = [];
      for(let prodId in this.cart$.items)
      this.orderItems.push(this.cart$.items[prodId]);
    })

    this.userSubscription = this.Auth.user.subscribe(user=>this.userId = user.uid);

    let cartQuantity$ = await this.shoppingCartService.totalQty();
    cartQuantity$.subscribe(count=>{
      this.shoppingCartItemsQuantity = count;
    })
  
    let totalprice$ = await this.shoppingCartService.totalPrice();
    totalprice$.subscribe(total=>{
      this.totalPrice = total;
    })

  }

async placeOrder() {
    this.order = {
      userId:this.userId,
      datePlaced: new Date().getDate(),
      shipping : this.shipping,
      items: this.orderItems
    }
  let status = await this.orderService.placeOrder(this.order);
  this.router.navigate(['/order-success',status.key]);
  }
  
  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
