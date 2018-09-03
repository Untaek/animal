import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs'
/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {
  items: Observable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase) {
    //this.items = afDB.list('/').valueChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

}
