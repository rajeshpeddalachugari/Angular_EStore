import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { templateJitUrl } from '@angular/compiler';
import { AppUser } from './models/app-user';


@Injectable()
export class AuthService {
  user:Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth,private router:Router,private route:ActivatedRoute,private userSer:UserService) { 
    this.user = afAuth.authState;
    
  }

  // login(){
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  //   .then(userT=>{
  //     if(userT){
  //       this.user.subscribe(temp=>{
  //         this.userSer.save(temp);
          
  //       }).unsubscribe();
        
  //       this.router.navigate([this.route.snapshot.queryParamMap.get('returnUrl') || '/']);
       
  //     }
  //   });
  // }

 async login(){
   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   
  }


  logout(){
    
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }

  get appUser$() : Observable<AppUser> {
   return this.user.switchMap(user => {
     if(user) return this.userSer.get(user.uid)

     return Observable.of(null);
   });
  }
}
