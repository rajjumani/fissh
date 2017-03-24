import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProfilePage } from '../pages/profile/profile';
import { AddprofilePage } from '../pages/addprofile/addprofile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NewsPage } from '../pages/news/news';
import { AddnewsPage } from '../pages/addnews/addnews';
import { BodPage } from '../pages/bod/bod';
import { MembersPage } from '../pages/members/members';
import { OfficebearersPage } from '../pages/officebearers/officebearers';
import { AboutPage } from '../pages/about/about';
import { SponsorPage } from '../pages/sponsor/sponsor';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPagePage } from '../pages/register-page/register-page';

import { Network } from '@ionic-native/network';




@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    AddprofilePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPagePage,
    NewsPage,
    BodPage,
    ContactPage,
    MembersPage,
    SponsorPage,
    OfficebearersPage,
    AboutPage,
    AddnewsPage


  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    ProfilePage,
    AddprofilePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPagePage,
    BodPage,
    ContactPage,
    MembersPage,
    OfficebearersPage,
    AboutPage,
    SponsorPage,
    AddnewsPage
 
  ],

 providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, Network]


})
export class AppModule {}
