import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { LoginWithEmailPage } from '../login-with-email/login-with-email';
import firebase from 'firebase'
import { AuthManager } from '../../util/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the Tab3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {

  user: Observable<firebase.User>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private afFirestore: AngularFirestore,
    private gplus: GooglePlus,
    private facebook: Facebook) {
    this.user = this.afAuth.authState
    this.user.subscribe(console.log)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
  }

  openLoginPage(route: string) {
    switch (route) {
      //case 'phone': this.openPhoneLogin(); break

      case 'email': this.openEmailLogin(); break
      case 'google': this.googleLogin(); break
      case 'facebook': this.facebookLogin(); break
    }
  }

  openEmailLogin() {
    console.log('openEmailLogin')
    this.navCtrl.push(LoginWithEmailPage)
  }

  async googleLogin() {
    if (this.platform.is('cordova')) {
      await this.nativeGoogleLogin()
    } else {
      await this.webGoogleLogin()
    }
  }

  async facebookLogin() {
    if (this.platform.is('cordova')) {
      await this.nativeFacebookLogin()
    } else {
      await this.webFacebookLogin()
    }
  }

  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: '877795668080-bsa0tebepnkd3smk1bh8ei30s3ssott4.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      const credential = await this.afAuth.auth.signInAndRetrieveDataWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )

      AuthManager.newUser(this.afFirestore, credential)
    }
    catch (e) {
      console.log(e)
    }
  }

  async webGoogleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      const credential = await this.afAuth.auth.signInWithPopup(provider)

      console.log(credential)

      AuthManager.newUser(this.afFirestore, credential)
    } catch (e) {
      console.log(e)
    }
  }

  async nativeFacebookLogin() {
    const response = await this.facebook.login(['public_profile', 'email'])

    const credential = await this.afAuth.auth.signInAndRetrieveDataWithCredential(
      firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken)
    )

    console.log(response)
    console.log(credential)
  }

  async webFacebookLogin() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      const credential = await this.afAuth.auth.signInWithPopup(provider)

      console.log(credential)

      AuthManager.newUser(this.afFirestore, credential)
    } catch (e) {
      console.log(e)
    }
  }

  signOut() {
    console.log('try to sign out')
    this.afAuth.auth.signOut()
  }

}
