import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BodPage} from '../bod/bod';
import {MembersPage} from '../members/members';
import {OfficebearersPage} from '../officebearers/officebearers';
import {AboutPage} from '../about/about';
import {EventPage} from '../event/event';
import {ContactPage} from '../contact/contact';
import {SponsorPage} from '../sponsor/sponsor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

bodpage = BodPage;
memberpage = MembersPage;
contactpage = ContactPage;
officebearerspage = OfficebearersPage;
aboutpage = AboutPage;
sponsorpage = SponsorPage;

  constructor(public navCtrl: NavController) {

  }

}
