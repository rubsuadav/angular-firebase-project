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
import { addDoc, collection, setDoc, doc, getDoc } from 'firebase/firestore';

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

  private getValidBirthdate(): string {
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    let birthdateInput: string | null;

    while (true) {
      birthdateInput = prompt('Please enter your birthdate (YYYY/MM/DD):');
      if (!birthdateInput) {
        alert('Birthdate is required');
      } else if (!dateRegex.test(birthdateInput)) {
        alert('Invalid date format. Please enter in YYYY/MM/DD format.');
      } else if (new Date(birthdateInput) > new Date()) {
        alert('Birthdate cannot be in the future.');
      } else {
        break;
      }
    }

    return birthdateInput;
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

  public async loginWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(FIREBASE_AUTH, provider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredentials);

    const user = userCredentials.user;

    const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
    if (!userDoc.exists()) {
      const newUser = {
        birthdate: this.getValidBirthdate(),
        name: user.displayName?.split(' ')[0] as string,
        lastname: user.displayName?.split(' ')[1] || '', // Lastname is optional in Google
        email: user.email as string,
        age: 0, // No provider by Google
        username: user.email?.split('@')[0] as string,
        password: '', // Password is not needed for Google login
        phone: '', // No provider by Google
        rol: 'authenticated',
      };

      await this.insertUserToDB(user.uid, newUser, '');
    }
    return { token: credential?.accessToken, userId: user.uid };
  }
}
