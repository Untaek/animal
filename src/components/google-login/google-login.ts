import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs';

import firebase from 'firebase'
import { Platform, Toast, ToastController } from 'ionic-angular';

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {
  user: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private toastCtrl: ToastController,
  ) {
    this.user = afAuth.authState
  }

  googleLogin() {
    this.nativeGoogleLogin()
    if (this.platform.is('android')) {
      this.nativeGoogleLogin()
    } else {
      this.webGoogleLogin()
    }
  }

  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '877795668080-bsa0tebepnkd3smk1bh8ei30s3ssott4.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      console.log(gplusUser)

      const success = await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )

      if (success) this.toastCtrl.create({ message: 'successed' }).present()
      else this.toastCtrl.create({ message: 'failed' }).present()
    }
    catch (e) {
      this.toastCtrl.create({ message: 'failed' }).present()
      console.log(e)
    }
  }

  async webGoogleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await this.afAuth.auth.signInWithPopup(provider)
    } catch (e) {
      console.log(e)
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout()
    }
  }
}
