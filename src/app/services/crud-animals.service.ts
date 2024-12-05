import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

//local imports
import { FIREBASE_DB } from '../../config';
import { Animal } from '../models/animal';
import { handleValidationAnimal } from '../validations/validate';

@Injectable({
  providedIn: 'root',
})
export class CRUDAnimalsService {
  constructor() {}

  private async getUserNameById() {
    const user = await getDoc(
      doc(FIREBASE_DB, 'users', localStorage.getItem('userId') as string)
    );
    return user.get('username');
  }

  public async getAllAnimals(): Promise<any> {
    const animalsSnapshot = await getDocs(collection(FIREBASE_DB, 'animals'));
    return animalsSnapshot.docs.map((doc) => doc.data());
  }

  public async getAnimalById(id: string): Promise<any> {
    const animal = await getDoc(doc(FIREBASE_DB, 'animals', id));
    return animal.data();
  }

  public async createAnimal(animal: Animal): Promise<any> {
    if (handleValidationAnimal(animal)) {
      throw new Error(handleValidationAnimal(animal));
    }
    const ownerId = await this.getUserNameById();
    animal.ownerId = ownerId;
    await addDoc(collection(FIREBASE_DB, 'animals'), animal);

    // asociate the animal to the user (1*N)
    await addDoc(
      collection(
        FIREBASE_DB,
        'users',
        localStorage.getItem('userId') as string,
        'animals'
      ),
      [
        {
          animals: animal.name,
        },
      ]
    );
  }

  public async updateAnimal(animal: Animal, id: string): Promise<any> {
    if (handleValidationAnimal(animal)) {
      throw new Error(handleValidationAnimal(animal));
    }
    await updateDoc(doc(FIREBASE_DB, 'animals', id), { ...animal });
  }

  // only admin can delete animals
  public async deleteAnimal(id: string): Promise<any> {
    await deleteDoc(doc(FIREBASE_DB, 'animals', id));
  }
}
