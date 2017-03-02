import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ContactPage} from '../contact/contact';

/*
  Generated class for the News page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

aboutPage = ContactPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
