import { AngularFirestore } from 'angularfire2/firestore'
import { firestore, auth } from 'firebase';
import { IUser } from '../interfaces/IUser';

export class AuthManager {
  private afFirestore: AngularFirestore

  constructor(afFirestore: AngularFirestore) {
    this.afFirestore = afFirestore
  }

  static newUser(afFirestore: AngularFirestore, credential: auth.UserCredential) {
    const user: IUser = {
      email: credential.user.email,
      name: credential.user.displayName,
      uid: credential.user.uid,
      photoURL: credential.user.photoURL,
      creationDate: credential.user.metadata.creationTime,
      lastLogin: credential.user.metadata.lastSignInTime
    }

    if (credential.additionalUserInfo.isNewUser) {
      afFirestore.collection('user').doc(user.uid).set(user)
    }
  }

  static connectionStatus() {

  }
}
