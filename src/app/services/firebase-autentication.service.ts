import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import * as CryptoJS from 'crypto-js';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';

// local imports
import { User as U } from '../models/user';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../config';
import { handleValidationUser } from '../validations/validate';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAutenticationService {
  constructor() {}

  private async insertUserToDB(
    userId: string,
    user: U,
    hashedPassword: string
  ) {
    await setDoc(doc(FIREBASE_DB, 'users', userId), {
      ...user,
      createdAt: new Date().toLocaleString(),
      password: hashedPassword,
    });

    await addDoc(collection(FIREBASE_DB, 'users', userId, 'role'), {
      name: user.rol,
    });

    await addDoc(collection(FIREBASE_DB, 'users', userId, 'animals'), {
      animals: (user.animals = []),
    });
  }

  public async registerUser(user: U): Promise<User> {
    if (handleValidationUser(user)) {
      throw new Error(handleValidationUser(user));
    }
    const userCredentials = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      user.email,
      user.password
    );

    await updateProfile(userCredentials.user, {
      displayName: user.name + ' ' + user.lastname,
    });

    await this.insertUserToDB(
      userCredentials.user.uid,
      user,
      CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex)
    );

    return userCredentials.user;
  }

  public async login(email: string, password: string): Promise<User> {
    const userCredentials = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    return userCredentials.user;
  }

  public async loginWithGoogle(): Promise<string | undefined> {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(FIREBASE_AUTH, provider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredentials);
    return credential?.accessToken;
  }
}
