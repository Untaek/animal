import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Button, Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs'
import { testTimelines } from '../../dataset';
import { VideoEditor } from '@ionic-native/video-editor';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AngularFireFunctions } from 'angularfire2/functions';
import { File } from '@ionic-native/file'
import { AngularFireStorage, createUploadTask, } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
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
  progress: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDB: AngularFireDatabase,
    private afFunc: AngularFireFunctions,
    private video: VideoEditor,
    private camera: Camera,
    private androidPermissions: AndroidPermissions,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth) {
    //this.items = afDB.list('/').valueChanges()
    this.items = testTimelines
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

  async upload() {
    if (this.platform.is('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => {
          console.log('Has permission?', result.hasPermission)
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        })
        .catch(
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        );
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
    }

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

      const longer = originalInfo.width > originalInfo.height ?
        originalInfo.width : originalInfo.height

      const width = originalInfo.width > 640 ? 640 : originalInfo.width
      const height = originalInfo.width > 480 ? width / originalInfo.width * originalInfo.height : originalInfo.height

      const filename = `${this.afAuth.auth.currentUser.uid}_${Date.now()}`
      const targetFilename = `original/animated/${filename}.mp4`

      const result = await this.video.transcodeVideo({
        fileUri: uri,
        outputFileName: filename,
        outputFileType: this.video.OutputFileType.MPEG4,
        optimizeForNetworkUse: this.video.OptimizeForNetworkUse.YES,
        saveToLibrary: true,
        audioChannels: 2,
        fps: 24,
        videoBitrate: 500000,
        width,
        progress: info => { this.progress = info; console.log(this.progress) }
      })
      console.log(result)
      const buffer = await this.file.readAsArrayBuffer(this.file.externalRootDirectory + 'Movies/Mobile/', filename + '.mp4')
      console.log(buffer)

      this.afStorage.upload(targetFilename, buffer, { contentType: 'video/mp4' }).then(snap => {
        console.log(snap)
      },
        console.log)
    } catch (e) {
      console.log(e)
    }
  }
}
