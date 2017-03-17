import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProfilePage } from '../pages/profile/profile';
import { AddprofilePage } from '../pages/addprofile/addprofile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NewsPage } from '../pages/news/news';
import { BodPage } from '../pages/bod/bod';
import { MembersPage } from '../pages/members/members';
import { OfficebearersPage } from '../pages/officebearers/officebearers';
import { AboutPage } from '../pages/about/about';
import { SponsorPage } from '../pages/sponsor/sponsor';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';




@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    AddprofilePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    NewsPage,
    BodPage,
    ContactPage,
    MembersPage,
    SponsorPage,
    OfficebearersPage,
    AboutPage,


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
    RegisterPage,
    BodPage,
    ContactPage,
    MembersPage,
    OfficebearersPage,
    AboutPage,
    SponsorPage,
 
  ],

 providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]


})
export class AppModule {}
