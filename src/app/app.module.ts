import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomeTabPage } from '../pages/home-tab/home-tab';
import { LoginPage } from '../pages/login/login';
import { LoginWithEmailPage } from '../pages/login-with-email/login-with-email';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'
import { LoginWithPhonePage } from '../pages/login-with-phone/login-with-phone';
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

const firebaseConfig = {
  apiKey: 'AIzaSyAsdcU4x5Few8dI8HFHEZbm_C_c4zRD5qQ',
  authDomain: 'animal-f6c09.firebaseapp.com',
  databaseURL: "https://animal-f6c09.firebaseio.com/",
  projectId: "animal-f6c09",
  storageBucket: "animal-f6c09.appspot.com",
  messagingSenderId: "877795668080"
}

@NgModule({
  declarations: [
    MyApp,
    HomeTabPage,
    LoginPage,
    LoginWithEmailPage,
    LoginWithPhonePage,
    TabPage,
    Tab2Page,
    Tab3Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeTabPage,
    LoginPage,
    LoginWithEmailPage,
    LoginWithPhonePage,
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
    Facebook,
    Deeplinks,
    VideoEditor,
    Camera,
    AndroidPermissions,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
})
export class AppModule { }
