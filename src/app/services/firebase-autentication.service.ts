import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import * as CryptoJS from 'crypto-js';
import { addDoc, collection } from 'firebase/firestore';

// local imports
import { User as U } from '../models/user';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../config';
import { handleValidationUser } from '../validations/validate';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAutenticationService {
  constructor() {}

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

    await addDoc(collection(FIREBASE_DB, 'users'), {
      ...user,
      createdAt: new Date().toLocaleString(),
      password: CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex),
    });

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
}
