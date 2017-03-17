import { Injectable } from '@angular/core';
import { HTTP } from 'ionic-native';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


export class User {
 user_id : number;
 profile_id : number;
 name: string;
 fullname : string;
 email: string;
 address : string;
 mobile : string;
 api_token : string;

 constructor(user_id: number, profile_id: number, name : string, fullname: string, email: string, address : string, mobile: string, api_token: string) {
   this.user_id = user_id;
   this.profile_id = profile_id;
   this.name = name;
   this.fullname = fullname;
   this.email = email;
   this.address = address;
   this.mobile = mobile;
   this.api_token = api_token;
 }
}

export class LoginError {
 email : string;
 password : string;
 msg : string;

 constructor(email : string, password : string, msg : string) {
   this.email = email;
   this.password = password;
   this.msg = msg;
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
  loginError : LoginError;
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

              //console.log(data.status);
              //console.log(data.data); // data received by server
              //console.log(data.headers);

              if(data.status == 200){
                let datagot = JSON.parse(data.data);
                if(datagot.error){
                  
                  //console.log(datagot.msg);

                  let access = false;
                  this.loginError = new LoginError("", "", datagot.msg);
                  observer.next(access);
                  observer.complete();
                }
                else{
                  let access = true;
                  this.currentUser = new User(datagot.user.id, datagot.user.userprofile.id, datagot.user.name, datagot.user.userprofile.fullname, datagot.user.email, datagot.user.userprofile.address, datagot.user.userprofile.mobile, datagot.api_token);
                  observer.next(access);
                  observer.complete();
                }
              }

            })
            .catch(error => {

              //console.log(error.status);
              //console.log(error.error); // error message as string
              //console.log(error.headers);

              let datagot = JSON.parse(error.error);
              //console.log(datagot.email);
              //console.log(datagot.password);

              let access = false;
              this.loginError = new LoginError(datagot.email, datagot.password, "");
              observer.next(access);
              observer.complete();

            });
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

  public setUserInfo(user : User) : any {
    return this.currentUser = user;
  }

  public getLoginError() : LoginError {
    return this.loginError;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
