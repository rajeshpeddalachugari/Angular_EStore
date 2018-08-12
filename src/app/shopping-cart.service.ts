import {
  Injectable
} from '@angular/core';
import {
  AngularFireDatabase
} from 'angularfire2/database';
import {
  Products, shoppingCartItems
} from './models/app-user';
import 'rxjs/add/operator/take'
import { promise } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';
import { shoppingCart } from './models/shopping-Cart';

@Injectable()
export class ShoppingCartService {
  shippingCardtItemQuantity : number;
  constructor(private db: AngularFireDatabase) {}

  create() {
    return this.db.list('/shopping-carts').push({
      datecreated: new Date().getTime()
    })
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
    
  }

  async getCartAsList(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
  }


  async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  } 

  getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

 async ClearCart(){
  let cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  async addToCart(product: Products) {
    
    this.updateCartQuantity(product, 1);
  }

  async removeFromCart(product: Products) {
    this.updateCartQuantity(product, -1);
  }

  private async updateCartQuantity(product: Products, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    
    item$.snapshotChanges().take(1).subscribe(item => {
     
     
       if(item.payload.val()){
        let quantity = item.payload.val().quantity + change;
        if (quantity === 0) item$.remove();
        else item$.update({ quantity : item.payload.val().quantity + change})
       } 
       else item$.set({product:product, quantity : 1})
    });
  }


  async totalQty() {
    let count: number;
    let cart$ = await this.getCart();
    return cart$.map(cart => {
      count = 0;
      for (let prodId in cart.payload.val().items)
        count += cart.payload.val().items[prodId].quantity;
      return count;
    });
  }

  async totalPrice() {  
    let total: number;
    let cart$ = await this.getCart();
    return cart$.map(cart => {
      total = 0;
      for (let prodId in cart.payload.val().items)
        total += cart.payload.val().items[prodId].quantity * cart.payload.val().items[prodId].product.price;
      return total;
    });
  }
  }




// if(item) item$.update({ quantity : item.payload.val().quantity + 1})
// else item$.set({product:product, quantity : 1})
