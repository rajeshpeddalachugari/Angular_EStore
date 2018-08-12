import { Component, OnInit , ViewChild } from '@angular/core';
import { ProductService } from '../product.service';

import { HttpClient } from '@angular/common/http';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  shoppingCartItemsQuantity : number;
  cart$;
  keys = [];
  totalPrice;
  constructor(private prodService: ProductService,private shoppingCartService :ShoppingCartService) {

  }

 async ngOnInit() {

    let cart = await this.shoppingCartService.getCart();
    cart.subscribe(cart => {
      this.cart$ = cart.payload.val();
        if(this.cart$.items){
          this.keys = Object.keys(this.cart$.items);
        }
        else{
          this.keys = Object.keys("");
        }
       
    })

    let cartQuantity$ = await this.shoppingCartService.totalQty();
    cartQuantity$.subscribe(count=>{
      this.shoppingCartItemsQuantity = count;
    })

    let totalprice$ = await this.shoppingCartService.totalPrice();
    totalprice$.subscribe(total=>{
      this.totalPrice = total;
    })
  }

  addToCart(productId){
    this.updaQuantity(productId,1)
  }

  removeFromCart(productId){
    this.updaQuantity(productId,-1)
  }

  ClearCart(){
    this.shoppingCartService.ClearCart();
  }


 async updaQuantity(productId,change:number){
   
    let cartId = await this.shoppingCartService.getOrCreateCartId();
    let item = this.shoppingCartService.getItem(cartId,productId);
    item.snapshotChanges().take(1).subscribe(t=>{
      let quantity = (t.payload.val().quantity || 0) + change
      if (quantity === 0) item.remove();
      else
      item.update({
        quantity: (t.payload.val().quantity || 0) + change
      });
    })
  }
}

