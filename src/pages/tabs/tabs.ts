import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NewsPage } from '../news/news';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';

import { AuthService, User } from '../../providers/auth-service';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = NewsPage;
  tab3Root: any = ProfilePage;
 
  constructor(public navCtrl: NavController, private auth: AuthService) {

  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.navCtrl.setRoot(LoginPage);
    });
  }
}
