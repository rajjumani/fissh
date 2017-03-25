import { Component} from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading  } from 'ionic-angular';

import { HTTP } from 'ionic-native';
import 'rxjs/add/operator/map';

import { Network } from '@ionic-native/network';

import { AuthService} from '../../providers/auth-service';

import {AddprofilePage} from '../addprofile/addprofile';

/*
  Generated class for the Members page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage{

  currentUser : any;
  searchInput : string;

  addprofilePage = AddprofilePage;

  loading: Loading;
  members : Member[];
  constMembers : Member[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private network: Network) {
  	this.currentUser = this.auth.getUserInfo();
  	this.searchInput = '';
    this.loadMeambers();
  }

 ionViewDidLoad() {
    //console.log('ionViewDidLoad MembersPage');
  	//this.currentUser = this.auth.getUserInfo();
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
  	if(this.isOnline()){

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

                    this.constMembers = this.members;
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

             //   let datagot = JSON.parse(error.error);
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

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.loadMeambers();

    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 1500);
  }

  searchMembers(searchbar) {
    // set q to the value of the searchbar
    this.members = this.constMembers;
    var q = this.searchInput;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.members = this.members.filter((v) => {
      if(( v.fullname && q ) || ( v.email && q ) || ( v.mobile && q ) || ( v.address && q )) {
        if (v.fullname.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        else if (v.mobile.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }

        else if (v.email.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }

        else if (v.address.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    //console.log(q, this.members.length);

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

export class Member{
	fullname : string;
	email : string;
	mobile : string;
	address : string;

}
