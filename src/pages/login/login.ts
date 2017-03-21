import { NgModule, Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService, LoginError } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

import { Network } from '@ionic-native/network';

import { RegisterPage } from '../register/register';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private network: Network) {}

  public createAccount() {
    //this.nav.push(RegisterPage);
  }






  public login() {
    if(this.isOnline()){
      this.showLoading()
      this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
          this.loading.dismiss();
          this.nav.setRoot(TabsPage)
          });
        } else {
          let errorMsg = this.auth.getLoginError();
          //console.log(errorMsg);
          if(errorMsg.email != "" && errorMsg.email != null){
            setTimeout(() => {
              this.showError(errorMsg.email);
            });  
          }
          else if(errorMsg.password != "" && errorMsg.password != null){
            setTimeout(() => {
              this.showError(errorMsg.password);
            });  
          }
          else{
            setTimeout(() => {
              this.showError(errorMsg.msg);
            });  
          }
        }
      },
      error => {
        this.showError(error);
      });  
    }
    
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  isOnline(){
    if(this.network.type == 'none' ) {
       let alert = this.alertCtrl.create({
       title: "Internet Connection",
       subTitle:"Please Check Your Network connection",
       buttons: [{
          text: 'Ok',
          handler: () => {
              }
          }]
        });
      alert.present();
      return false;
     }
     return true;
  }
}
