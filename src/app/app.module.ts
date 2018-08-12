
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessfulComponent } from './order-successful/order-successful.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from "@angular/router"
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../environments/environment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MyordersComponent } from './my/myorders/myorders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthguardService } from './authguard.service';
import { UserService } from './user.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { CustomFormsModule } from 'ng2-validation'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatSortModule,MatFormFieldModule,MatInputModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import { SampleComponent } from './sample/sample.component';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { OrderService } from './order.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessfulComponent,
    MyProductsComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    MyordersComponent,
    LoginComponent,
    ProductFormComponent,
    SampleComponent,
    ProductsFilterComponent,
    ProductCardComponent,
   
  ],
  imports: [
    MatPaginatorModule, MatSortModule,BrowserAnimationsModule,CdkTableModule,MatFormFieldModule,MatInputModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatTableModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent,pathMatch:'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'sample', component: SampleComponent },
      { path: 'login',component:LoginComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent,canActivate:[AuthguardService] },
      { path: 'order-success/:id', component: OrderSuccessfulComponent ,canActivate:[AuthguardService]},
      { path: 'My/orders',component:MyordersComponent ,canActivate:[AuthguardService]},
      { 
        path: 'admin/products/new' , 
        component: ProductFormComponent,
        canActivate:[AuthguardService,AdminAuthGuardService]
      },
      { 
        path: 'admin/products/:id' , 
        component: ProductFormComponent,
        canActivate:[AuthguardService,AdminAuthGuardService]
      },
      { 
        path: 'admin/products' , 
        component: AdminProductsComponent,
        canActivate:[AuthguardService,AdminAuthGuardService]
      },
      
      { path: 'admin/orders', 
        component: AdminOrdersComponent ,
        canActivate:[AuthguardService,AdminAuthGuardService]
      },
      { path: '**',component:HomeComponent}
    ])
  ],
  providers: [
    AuthService,
    AuthguardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
