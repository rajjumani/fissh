import { Injectable } from '@angular/core';
import { HTTP } from 'ionic-native';
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

  constructor() { 
    
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let url = 'http://fissh.website/api/user/login';
       
        HTTP.post(url, {
                        "email" : credentials.email,
                        "password" : credentials.password
                      }, 
                      {
                        "Content-type" : "application/json",
                        "accept" : "application/json"
                      })
            .then(data => {

              console.log(data.status);
              console.log(data.data); // data received by server
              console.log(data.headers);

            })
            .catch(error => {

              console.log(error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);

            });
        
        let access = true;//(credentials.password === "admin1401" && credentials.email === "admin");
        this.currentUser = new User('User', 'admin@gmail.com');
        observer.next(access);
        observer.complete();
      });


    }
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
