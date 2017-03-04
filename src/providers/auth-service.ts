import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';



export class User {
 name: string;
 email: string;

 constructor(name: string, email: string) {
   this.name = name;
   this.email = email;
 }
}

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  currentUser: User;
  access : boolean;

  constructor(private http: Http) { }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        /*let url = 'http://fissh.website/api/user/login';

        this.http.post(url,JSON.stringify(credentials))
          .map(res => res.json())
          .subscribe(data => {
            console.log(data);
          });
        */
        let access = (credentials.password === "admin1401" && credentials.email === "admin");
        this.currentUser = new User('User', 'admin@gmail.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  private handleSuccess(data, status, headers, config){
      alert("Result: " + JSON.stringify(data)); 
  }

  private handleError(data, status, headers, config){
     alert("Result: " + JSON.stringify(data)); 
  }
  public register(credentials) {
     if (credentials.email === null || credentials.password === null) {
       return Observable.throw("Please insert credentials");
     } else {
       // At this point store the credentials to your backend!
       return Observable.create(observer => {
         observer.next(true);
         observer.complete();
       });
     }
   }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
