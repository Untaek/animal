import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

/**
 * Generated class for the LoginWithPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-with-phone',
  templateUrl: 'login-with-phone.html',
})
export class LoginWithPhonePage {
  @ViewChild(Slides) slides: Slides
  phoneNumber: string
  certificationNumber: string

  appVerifier: firebase.auth.ApplicationVerifier
  confirmResult: firebase.auth.ConfirmationResult

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier(
      'send-sms-button', { size: 'invisible' }
    )
    this.slides.lockSwipes(true)
    console.log('ionViewDidLoad LoginWithPhonePage');
  }

  async sendSMS() {
    /**
     * for test
     */
    this.phoneNumber = '+16464397881'

    this.confirmResult = await this.afAuth.auth.signInWithPhoneNumber(this.phoneNumber, this.appVerifier)
    this.slides.lockSwipes(false)
    this.slides.slideTo(1)
    this.slides.lockSwipes(true)
    console.log(this.phoneNumber)
  }

  async signin() {
    this.certificationNumber = '123456'
    const credential = await this.confirmResult.confirm(this.certificationNumber)
    console.log(credential)
    if (credential) this.navCtrl.goToRoot({})
  }
}
