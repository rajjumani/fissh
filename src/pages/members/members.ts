import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading  } from 'ionic-angular';

import { HTTP } from 'ionic-native';
import 'rxjs/add/operator/map';

import { AuthService, User } from '../../providers/auth-service';

/*
  Generated class for the Members page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage {

  currentUser : any;

  loading: Loading;
  members : Member[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  	this.currentUser = this.auth.getUserInfo();
  	this.loadMeambers();

  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
  
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

  loadMeambers(){
  	  	  this.showLoading();
    let url = 'http://fissh.website/api/userprofile/?api_token=' + this.currentUser.api_token;
       
    HTTP.get(url, { }, 
                      {
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
                  this.showError(datagot.msg);

                  
                }
                else{
                  this.members = datagot.userprofile;
                  //for (let member of this.members) {
				  //  console.log(member.fullname);
				  //}
                  
                }
              }

            })
            .catch(error => {

              //console.log(error.status);
              //console.log(error.error); // error message as string
              //console.log(error.headers);

              let datagot = JSON.parse(error.error);
              if(error.status == 401){
              	this.showError("You are Not authorized,Try after ReLogin.");
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

export class Member{
	fullname : string;
	email : string;
	mobile : string;
	address : string;

}