import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BodPage} from '../bod/bod';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

bodpage = BodPage;

  constructor(public navCtrl: NavController) {

  }

}
