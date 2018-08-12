import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ProductService
} from '../../product.service';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  OnDestroy
} from '@angular/core/src/metadata/lifecycle_hooks';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { templateJitUrl } from '@angular/compiler';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  displayedColumns = ['title', 'price','key'];
  fleetData = [];
  dataSource: MatTableDataSource<any> = null;
  ts = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  
 

  constructor(private prodServire: ProductService) {
    this.prodServire.getAll().subscribe(payload => {
      payload.map(action => {
        const key = action.payload.key;
        const data = {
          key,
          ...action.payload.val()
        };
        return this.ts.push(data);
      })
      //console.log(this.ts)
      this.fleetData = this.ts;
      this.dataSource.data = this.fleetData;
    }
  )
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.fleetData);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue ;
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
 

}
