import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/take";


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$ = [];
  product = {};
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //this.categories$ = categoryService.getCategories().subscribe();
    categoryService.getCategories().subscribe(t=>t.map(t=>this.categories$.push(t)));
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id)
    this.productService.get(this.id).take(1).subscribe(param=>{
      this.product = param;
      
    })
    
  }

  ngOnInit() {}
  save(product) {
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm('Are you sure want to delete this product ?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
    else{
      return;
    }
    
  }

}
