import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { HTTP } from 'ionic-native';
import 'rxjs/add/operator/map';

import { Network } from '@ionic-native/network';

import { AuthService, User } from '../../providers/auth-service';

/*
  Generated class for the Addprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addprofile',
  templateUrl: 'addprofile.html'
})
export class AddprofilePage {

  currentUser : any;
  loading: Loading;
  newUser = {
  	fullname : '',
  	mobile : '',
  	email : '',
  	address : ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private network: Network) {
  	this.currentUser = this.auth.getUserInfo();
  }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad AddprofilePage');
    this.currentUser = this.auth.getUserInfo();
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

  showSuccess(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  createProfile(){
  	if(this.isOnline()){
      this.showLoading();
      let url = 'http://fissh.website/api/userprofile?api_token=' + this.currentUser.api_token;
         
      HTTP.post(url, 
              {
                "fullname" : this.newUser.fullname,
                "address" : this.newUser.address,
                "email" : this.newUser.email,
                          "mobile" : this.newUser.mobile
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
                    
                    if(datagot.status_code == 401 || datagot.status_code == '401'){
                    this.showError("You are not allowed to add new members.");
                  }
                  else if(datagot.status_code == 404 || datagot.status_code == '404'){
                    this.showError("Data could not reach to server,try again.");
                  }
                  else{
                    this.showError("Something Went Wrong,Try after sometime.");
                  }
                    

                    
                  }
                  else{
                    //console.log(datagot.user.id);
                    //console.log(datagot.userprofile.id);
                    
                    setTimeout(() => {
                  this.showSuccess("Member Added Successfully,Check at Memberslist Page.");
                });

                    this.newUser.fullname = '';
                    this.newUser.address = '';
                    this.newUser.email = '';
                    this.newUser.mobile = '';
                  }
                }

              })
              .catch(error => {

                //console.log(error.status);
                //console.log(error.error); // error message as string
                //console.log(error.headers);

                let errorMsg = JSON.parse(error.error);
                if(error.status == 401){
                  this.showError("You are Not authorized,Try after ReLogin.");
                }
                  else if(errorMsg.fullname != "" && errorMsg.fullname != null){
                setTimeout(() => {
                  this.showError(errorMsg.fullname);
                });  
              }
              else if(errorMsg.email != "" && errorMsg.email != null){
                setTimeout(() => {
                  this.showError(errorMsg.email);
                });  
              }
              else if(errorMsg.mobile != "" && errorMsg.mobile != null){
                setTimeout(() => {
                  this.showError(errorMsg.mobile);
                });  
              }
              else if(errorMsg.address != "" && errorMsg.address != null){
                setTimeout(() => {
                  this.showError(errorMsg.address);
                });  
              }
                else{
                  this.showError("Server Side Error Occured.");  
                }
                

              });

      setTimeout(() => {
        this.loading.dismiss();
      });
  
    }
    
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
