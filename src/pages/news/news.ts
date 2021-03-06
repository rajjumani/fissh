import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import {ContactPage} from '../contact/contact';
import {AddnewsPage} from '../addnews/addnews';
import { HTTP } from 'ionic-native';
import 'rxjs/add/operator/map';

import { Network } from '@ionic-native/network';

import { AuthService } from '../../providers/auth-service';


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

currentUser : any;
searchInput : string;
addnewsPage = AddnewsPage;

loading: Loading;
  news_array : News[];
const_news_array : News[];  

aboutPage = ContactPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private network: Network) {
  	this.currentUser = this.auth.getUserInfo();
  	this.searchInput = '';
  	this.loadNews();
  }

ionViewDidLoad() {
    //console.log('ionViewDidLoad NewsPage');
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

  loadNews(){
  	if(this.isOnline()){

      this.showLoading();
      let url = 'http://fissh.website/api/news/?api_token=' + this.currentUser.api_token;
         
      HTTP.get(url, { }, 
                        {
                          "accept" : "application/json"
                        })
              .then(data => {

                // console.log(data.status);
                // console.log(data.data); // data received by server
                // console.log(data.headers);

                if(data.status == 200){
                  let datagot = JSON.parse(data.data);
                  if(datagot.error){
                    
                    //console.log(datagot.msg);
                    this.showError(datagot.msg);

                    
                  }
                  else{
                    this.news_array = datagot.news;

                   this.const_news_array = this.news_array;
        //             for (let n of this.news_array) {
  				  //   console.log(n.title);
  				  // }
                    
                  }
                }

              })
              .catch(error => {

                //console.log(error.status);
                //console.log(error.error); // error message as string
                //console.log(error.headers);

              //  let datagot = JSON.parse(error.error);
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
    this.loadNews();

    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 1500);
  }

searchNews(searchbar) {
    // set q to the value of the searchbar
    this.news_array = this.const_news_array;
    var q = this.searchInput;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.news_array = this.news_array.filter((v) => {
      if(( v.title && q ) || ( v.description && q ) ) {
        if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        else if (v.description.toLowerCase().indexOf(q.toLowerCase()) > -1) {
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

export class News{
	title : string;
	imagepath : string;
	description : string;
}
