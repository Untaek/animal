import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomeTabPage } from '../pages/home-tab/home-tab';
import { Deeplinks } from '@ionic-native/deeplinks';
import { LoginWithEmailPage } from '../pages/login-with-email/login-with-email';
import { UserStatusProvider } from '../providers/user-status/user-status';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav
  rootPage: any = HomeTabPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    deeplinks: Deeplinks,
    userStatus: UserStatusProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      deeplinks.route({
        '/': LoginWithEmailPage
      }).subscribe((match) => {
        console.log('Successfully matched route', match)
        console.log(this.nav)
        this.nav.push(LoginWithEmailPage, { emailLink: match.$link.url })
        console.log(match.$link.url)
      },
        (nomatch) => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
        })
    });
  }
}

