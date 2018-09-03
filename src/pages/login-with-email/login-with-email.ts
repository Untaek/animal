import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import firebase from 'firebase'

/**
 * Generated class for the LoginWithEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-with-email',
  templateUrl: 'login-with-email.html',
})
export class LoginWithEmailPage {
  email: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth) {
    console.log(navParams.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginWithEmailPage');

    const emailLink = this.navParams.get('emailLink')
    if (emailLink) {
      if (this.afAuth.auth.isSignInWithEmailLink(emailLink)) {
        this.afAuth.auth.signInWithEmailLink('ejdejd2005@naver.com', this.navParams.get('emailLink'))
          .then(console.log)
          .catch(console.log)
      }
    }
  }

  async emailLogin(event) {
    /**
     * for test
     */
    this.email = 'ejdejd2005@naver.com'
    await this.afAuth.auth.sendSignInLinkToEmail(this.email,
      {
        url: 'https://animalauth.page.link/UDPG',
        handleCodeInApp: true,
        android: {
          packageName: 'com.untaek.animal'
        }
      })
  }

}
