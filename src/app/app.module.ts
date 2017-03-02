import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';


import { NewsPage } from '../pages/news/news';
import { BodPage } from '../pages/bod/bod';


@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    HomePage,
    TabsPage,

    LoginPage,
    RegisterPage,

    NewsPage,
    BodPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    ProfilePage,
    HomePage,
    TabsPage,

    LoginPage,
    RegisterPage,

    BodPage


  ],

 providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]


})
export class AppModule {}
