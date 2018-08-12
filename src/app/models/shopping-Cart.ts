import { shoppingCartItems } from "./app-user";

export class shoppingCart {
  
    constructor(public items:shoppingCartItems[]){

    }
  get totalItemscount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
      return count;
    }
  }
}
