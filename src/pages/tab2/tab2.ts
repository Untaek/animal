import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Tab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface ISimpleAnimal {
  petID: string
  isUpdated: boolean
  photoURL: string
  likes: number
} 

@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {
  
  data: ISimpleAnimal[] = [
    { petID: '155aa', isUpdated: true, photoURL: 'https://googlephoto.com/155aa', likes: 500 },
    { petID: '43erf', isUpdated: false, photoURL: 'https://', likes: 60 },
    { petID: '25afe', isUpdated: true, photoURL: 'http://', likes: 100 },
    { petID: '87abb', isUpdated: true, photoURL: 'http://', likes: 20055}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
  }

}
