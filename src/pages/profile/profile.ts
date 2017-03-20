import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { HTTP } from 'ionic-native';
import 'rxjs/add/operator/map';

import { LoginPage } from '../login/login';

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

  newpassword : string;
  confirmpassword : string;
  currentUser : any;
  loading: Loading;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  	this.currentUser = this.auth.getUserInfo();
    this.newpassword = '';
    this.confirmpassword = '';
  }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad ProfilePage');
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

  updateProfile(){
  	  	  this.showLoading();
    let url = 'http://fissh.website/api/userprofile/' + this.currentUser.profile_id + '?api_token=' + this.currentUser.api_token;
       
    HTTP.post(url, 
    				{
    					"_method" : "PUT",
    					"fullname" : this.currentUser.fullname,
    					"address" : this.currentUser.address,
    					"email" : this.currentUser.email,
                        "mobile" : this.currentUser.mobile
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
                  
                  if(datagot.status_code == 404 || datagot.status_code == '404'){
	              	this.showError("Member you want to update do not exist.");
	              }
	              else if(datagot.status_code == 401 || datagot.status_code == '401'){
	              	this.showError("You are not autherized to update this data.");
	              }
	              else{
	              	this.showError("Something Went Wrong,Try after sometime.");
	              }
                  

                  
                }
                else{
                  //console.log(datagot.user.id);
                  //console.log(datagot.userprofile.id);
                  
                  setTimeout(() => {
		            this.showSuccess("Data Updated Successfully,Please ReLogin for better experience.");
		          });

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


  changePassword(){
          this.showLoading();
    if(this.newpassword == '' || this.newpassword == null){
      setTimeout(() => {
                this.showError("Please Enter Password");
              });
      this.confirmpassword = '';
    }
    else if(this.newpassword != this.confirmpassword){
      setTimeout(() => {
                this.showError("Passwords Do Not Match");
              });
      this.confirmpassword = '';
    }
    else{
      let url = 'http://fissh.website/api/user/changepassword/' + this.currentUser.user_id + '?api_token=' + this.currentUser.api_token;
         
      HTTP.post(url, 
              {
                "_method" : "PUT",
                "password" : this.newpassword
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
                    
                    if(datagot.status_code == 404 || datagot.status_code == '404'){
                    this.showError("Member Account do not exist.");
                  }
                  else if(datagot.status_code == 401 || datagot.status_code == '401'){
                    this.showError("You are not autherized to change password.");
                  }
                  else{
                    this.showError("Something Went Wrong,Try after sometime.");
                  }
                    

                    
                  }
                  else{
                    //console.log(datagot.user.id);
                    //console.log(datagot.userprofile.id);
                    
                    setTimeout(() => {
                  this.showSuccess("Password Changed Successfully,Login again with new password.");
                });
                
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
                else if(errorMsg.password != "" && errorMsg.password != null){
                  setTimeout(() => {
                    this.showError(errorMsg.password);
                  });  
                }
                else{
                  this.showError("Server Side Error Occured.");  
                }
                

              });
    
    }
    
    setTimeout(() => {
      this.loading.dismiss();
    });

  }

}
