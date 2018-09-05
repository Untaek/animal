import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../interfaces/IUser';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase'

/*
  Generated class for the UserStatusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserStatusProvider {
  private connectionRef: firebase.database.Reference
  private userStatusRef: firebase.database.Reference

  constructor(private afDb: AngularFireDatabase, private afFs: AngularFirestore, private afAuth: AngularFireAuth) {
    console.log('Hello UserStatusProvider Provider');

    this.connectionRef = afDb.database.ref('.info/connected')
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userStatusRef = this.afDb.database.ref(`/status/${user.uid}`)
        this.connectionStatus()
      }
    })
  }
  newUser(credential: firebase.auth.UserCredential) {
    console.log('new User')
    console.log(credential)
    const user: IUser = {
      email: credential.user.email,
      name: credential.user.displayName,
      uid: credential.user.uid,
      photoURL: credential.user.photoURL,
      creationDate: credential.user.metadata.creationTime,
    }

    if (credential.additionalUserInfo.isNewUser) {
      this.afFs.collection('user').doc(user.uid).set(user)
    }
  }

  private connectionStatus() {
    console.log('connection status listener')
    this.connectionRef.on('value', (snapshot) => {
      if (snapshot.val() == false) {
        return
      }

      this.userStatusRef.onDisconnect().set({ state: 'offline', last_changed: firebase.database.ServerValue.TIMESTAMP })
        .then(() => {
          this.userStatusRef.set({ state: 'online', last_changed: firebase.database.ServerValue.TIMESTAMP })
        })
    })
  }
}
