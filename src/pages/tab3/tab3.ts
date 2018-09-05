import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { LoginWithEmailPage } from '../login-with-email/login-with-email';
import firebase from 'firebase'
import { AngularFirestore } from 'angularfire2/firestore';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserStatusProvider } from '../../providers/user-status/user-status';

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
    private facebook: Facebook,
    private afDb: AngularFireDatabase,
    private userStatus: UserStatusProvider) {
    this.user = this.afAuth.authState
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
    try {
      let credential: firebase.auth.UserCredential
      if (this.platform.is('cordova')) {
        credential = await this.nativeGoogleLogin()
      } else {
        credential = await this.webGoogleLogin()
      }
      this.userStatus.newUser(credential)
      console.log(credential)
    } catch (e) {
      console.log(e)
    }
  }

  async facebookLogin() {
    try {
      let credential: firebase.auth.UserCredential
      if (this.platform.is('cordova')) {
        credential = await this.nativeFacebookLogin()
      } else {
        credential = await this.webFacebookLogin()
      }
      this.userStatus.newUser(credential)
    } catch (e) {
      console.log(e)
    }
  }

  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: '877795668080-bsa0tebepnkd3smk1bh8ei30s3ssott4.apps.googleusercontent.com',
        'offline': false,
        'scopes': 'profile email'
      })

      return this.afAuth.auth.signInAndRetrieveDataWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    }
    catch (e) {
      console.log(e)
    }
  }

  async webGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.afAuth.auth.signInWithPopup(provider)
  }

  async nativeFacebookLogin() {
    const response = await this.facebook.login(['public_profile', 'email'])

    return this.afAuth.auth.signInAndRetrieveDataWithCredential(
      firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken)
    )
  }

  async webFacebookLogin() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      return this.afAuth.auth.signInWithPopup(provider)
    } catch (e) {
      console.log(e)
    }
  }

  signOut() {
    console.log('try to sign out')
    if (firebase.auth().currentUser === null) {
      return
    }
    this.afDb.database.ref(`/status/${firebase.auth().currentUser.uid}`)
      .set({ state: 'offline', last_changed: firebase.database.ServerValue.TIMESTAMP })

    if (this.platform.is('cordova')) {
      this.gplus.logout()
    }
    this.afAuth.auth.signOut()
  }
}
