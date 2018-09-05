import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomeTabPage } from '../pages/home-tab/home-tab';
import { LoginWithEmailPage } from '../pages/login-with-email/login-with-email';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'
import { AngularFireFunctions, AngularFireFunctionsModule } from 'angularfire2/functions'
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage'
import { GooglePlus } from '@ionic-native/google-plus'
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { Facebook } from '@ionic-native/facebook'
import { Deeplinks } from '@ionic-native/deeplinks'
import { VideoEditor } from '@ionic-native/video-editor'
import { Camera } from '@ionic-native/camera'
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { TabPage } from '../pages/tab/tab';
import { Tab2Page } from '../pages/tab2/tab2';
import { Tab3Page } from '../pages/tab3/tab3';
import { UserStatusProvider } from '../providers/user-status/user-status';
import { File } from '@ionic-native/file'
import { HomeTabPageModule } from '../pages/home-tab/home-tab.module';
import { LoginWithEmailPageModule } from '../pages/login-with-email/login-with-email.module';
import { TabPageModule } from '../pages/tab/tab.module';
import { Tab2PageModule } from '../pages/tab2/tab2.module';
import { Tab3PageModule } from '../pages/tab3/tab3.module';

const firebaseConfig = {
  apiKey: 'AIzaSyAsdcU4x5Few8dI8HFHEZbm_C_c4zRD5qQ',
  authDomain: 'animal-f6c09.firebaseapp.com',
  databaseURL: "https://animal-f6c09.firebaseio.com/",
  projectId: "animal-f6c09",
  storageBucket: "animal-f6c09.appspot.com",
  messagingSenderId: "877795668080"
}

enableProdMode()

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    HomeTabPageModule,
    LoginWithEmailPageModule,
    TabPageModule,
    Tab2PageModule,
    Tab3PageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeTabPage,
    LoginWithEmailPage,
    TabPage,
    Tab2Page,
    Tab3Page
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFirestore,
    AngularFireFunctions,
    AngularFireStorage,
    Facebook,
    Deeplinks,
    VideoEditor,
    Camera,
    AndroidPermissions,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserStatusProvider
  ],
})
export class AppModule { }
