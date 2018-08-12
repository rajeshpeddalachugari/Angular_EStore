import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import { User } from './models/app-user';

@Injectable()
export class ProductService {
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private db:AngularFireDatabase,private http: HttpClient) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges();
  }
 
  getAllItems(){
    return this.db.list('/products').snapshotChanges();
  }
 
  getAllItemsAsObject(){
    return this.db.object('/products').snapshotChanges();
  }

  get(productId){
   return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId,product){
   return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl);
  }

}
