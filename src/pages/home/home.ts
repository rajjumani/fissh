import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BodPage} from '../bod/bod';
import {MembersPage} from '../members/members';
import {OfficebearersPage} from '../officebearers/officebearers';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {SponsorPage} from '../sponsor/sponsor';

import { AuthService} from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

currentUser : any;
bodpage = BodPage;
memberpage = MembersPage;
contactpage = ContactPage;
officebearerspage = OfficebearersPage;
aboutpage = AboutPage;
sponsorpage = SponsorPage;


  constructor(public navCtrl: NavController, private auth: AuthService) {
  	this.currentUser = this.auth.getUserInfo();
  }

  ionViewDidLoad() {
   //console.log('ionViewDidLoad HomePage');
   //this.currentUser = this.auth.getUserInfo();
  }

}
