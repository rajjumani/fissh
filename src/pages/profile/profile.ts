import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService, User } from '../../providers/auth-service';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  currentUser : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
  	this.currentUser = this.auth.getUserInfo();
  }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad ProfilePage');
  }

}
