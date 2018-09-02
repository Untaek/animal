import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { LoginWithEmailPage } from '../login-with-email/login-with-email';
import { LoginWithPhonePage } from '../login-with-phone/login-with-phone';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase'
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../util/IUser';
import { AuthManager } from '../../util/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private platform: Platform,
    private toastCtrl: ToastController,
    private gplus: GooglePlus) {
    this.afAuth.authState.subscribe(console.log)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openLoginPage(route: string) {
    switch (route) {
      case 'email': this.openEmailLogin(); break
      case 'phone': this.openPhoneLogin(); break
    }
  }

  openEmailLogin() {
    console.log('openEmailLogin')
    this.navCtrl.push(LoginWithEmailPage)
  }
  openPhoneLogin() {
    console.log('openEmailLogin')
    this.navCtrl.push(LoginWithPhonePage)
  }
  async googleLogin() {
    if (this.platform.is('android')) {
      await this.nativeGoogleLogin()
    } else {
      await this.webGoogleLogin()
    }
    this.navCtrl.pop()
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

  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      console.log('logout')
      this.gplus.logout()
    }
  }
}

