import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

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
    private afAuth: AngularFireAuth) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginWithEmailPage');
  }

  emailLogin(event) {
    this.afAuth.auth.sendSignInLinkToEmail(this.email, {
      handleCodeInApp: true,
      url: "https://animal-f6c09.firebaseapp.com",
    })
      .then(() => {
        window.localStorage.setItem('email', this.email)
      })
      .catch((error) => {
        console.log(error)
      })
  }

}
