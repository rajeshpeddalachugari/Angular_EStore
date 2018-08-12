import { Component, OnInit ,Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products$ = [];
  filteredProducts = [];
  ts = [];
  category : string;
 
  product;
  cart:any;
  subscription : Subscription;
  constructor(private prodService: ProductService,
    private cartService:ShoppingCartService,
    private route: ActivatedRoute) {
    
    prodService.getAllItems().switchMap(prod => {
      this.products$ = prod.map(t=>{
        const key = t.payload.key;
        const data = {
          key,
          ...t.payload.val()
        };
        return data;
      })
      return this.route.queryParamMap;
    }).subscribe(param => {
      this.category = param.get('category');

      this.filteredProducts = (this.category) ?
        this.products$.filter(prod => {
          return prod.category === this.category;
        }) : this.products$;

    })
  }
  async ngOnInit() {
  this.subscription =  (await this.cartService.getCart()).subscribe(cart=>{
    this.cart = cart.payload.val();
   
   })
   
  

  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  removeFromCart(product){
    this.cartService.removeFromCart(product);
  }

  getQuantity(productId){
 
    if(!this.cart){
    
      return 0;
    } 
    else{
      if(this.cart.items){
        console.log("inside else")
        let item = this.cart.items[productId];
        
           if(item){
             console.log("item:",item)
            
             return item.quantity;
           }
           else{
             return 0;
           }
      }
      else return 0;
    }

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
