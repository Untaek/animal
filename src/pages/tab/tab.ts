import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Button, Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs'
import { testTimelines } from '../../dataset';
import { VideoEditor } from '@ionic-native/video-editor';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
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
  items

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    afDB: AngularFireDatabase,
    private video: VideoEditor,
    private camera: Camera,
    private androidPermissions: AndroidPermissions,
    private platform: Platform) {
    //this.items = afDB.list('/').valueChanges()
    this.items = testTimelines
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
    if (this.platform.is('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => {
          console.log('Has permission?', result.hasPermission)
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        },
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      );
    }
  }

  async upload() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.ALLMEDIA,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    }

    try {
      const uri = 'file:' + await this.camera.getPicture(options)
      console.log(uri)
      const originalInfo = await this.video.getVideoInfo({ fileUri: uri })
      console.log(originalInfo)

      const width = originalInfo.width > 640 ? 640 : originalInfo.width
      const height = originalInfo.width > 640 ? width / originalInfo.width * originalInfo.height : originalInfo.height

      const result = await this.video.transcodeVideo({
        fileUri: uri,
        outputFileName: `${Date.now()}`,
        outputFileType: this.video.OutputFileType.MPEG4,
        optimizeForNetworkUse: this.video.OptimizeForNetworkUse.YES,
        saveToLibrary: true,
        audioChannels: 2,
        width,
        height,
        progress: console.log
      })

      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }
}
