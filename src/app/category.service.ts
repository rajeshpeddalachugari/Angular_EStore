import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  constructor(private db:AngularFireDatabase) {
    
   }

   getCategories(){
     return this.db.list('/categories').snapshotChanges();
   }

}
