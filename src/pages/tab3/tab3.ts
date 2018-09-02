import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

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
    private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState
    this.user.subscribe(console.log)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
  }

  openLoginPage() {
    console.log('openLoginPage')
    this.navCtrl.push(LoginPage)
  }

  signOut() {
    console.log('try to sign out')
    this.afAuth.auth.signOut()
  }

}
