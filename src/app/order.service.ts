import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase,private shoppingCartService:ShoppingCartService) { }

 async placeOrder(order){
   let result = await this.db.list('/orders').push(order);
   this.shoppingCartService.ClearCart();
   return result;
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges();
  }

  getOrderByUser(userId:string){
    return this.db.list('/orders',ref=>ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }
}