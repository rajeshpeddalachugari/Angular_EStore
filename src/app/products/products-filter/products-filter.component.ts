import { Component, OnInit,Input } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$: Observable<any[]>;
  @Input('category') category;
   constructor(categoryService:CategoryService) {
    this.categories$ = categoryService.getCategories();
   }

  ngOnInit() {
  }
}
