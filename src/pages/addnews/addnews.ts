import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { HTTP } from 'ionic-native';
import 'rxjs/add/operator/map';

import { Network } from '@ionic-native/network';

import { AuthService, User } from '../../providers/auth-service';


/*
  Generated class for the Addnews page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addnews',
  templateUrl: 'addnews.html'
})
export class AddnewsPage {

	currentUser : any;
  loading: Loading;
  newNews = {
  	title : '',
  	imagepath : '',
  	description : ''
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private network: Network) {
  	this.currentUser = this.auth.getUserInfo();
  }

  ionViewDidLoad() {
   console.log('ionViewDidLoad AddnewsPage');
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

  createNews(){
  	if(this.isOnline()){
      this.showLoading();
      let url = 'http://fissh.website/api/news?api_token=' + this.currentUser.api_token;
         
      HTTP.post(url, 
              {
                "fullname" : this.newNews.title,
                "address" : this.newNews.description,
                "email" : this.newNews.imagepath
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
                    this.showError("You are not allowed to add News.");
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
                  this.showSuccess("News Added Successfully,Check at News Page.");
                });

                    this.newNews.title = '';
                    this.newNews.description = '';
                    this.newNews.imagepath = '';
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
                  else if(errorMsg.title != "" && errorMsg.title != null){
                setTimeout(() => {
                  this.showError(errorMsg.title);
                });  
              }
              else if(errorMsg.description != "" && errorMsg.description != null){
                setTimeout(() => {
                  this.showError(errorMsg.description);
                });  
              }
              else if(errorMsg.imagepath != "" && errorMsg.imagepath != null){
                setTimeout(() => {
                  this.showError(errorMsg.imagepath);
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
