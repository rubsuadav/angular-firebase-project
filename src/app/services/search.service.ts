import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';

// local imports
import { FIREBASE_DB } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  public async searchAnimalsByName(name: string): Promise<any> {
    if (!name) throw new Error('Name is required');
    const lowerCaseName = name.toLowerCase();
    const querySnapshot = await getDocs(collection(FIREBASE_DB, 'animals'));
    const animals = querySnapshot.docs
      .map((doc) => doc.data())
      .filter((animal) => animal['name'].toLowerCase().includes(lowerCaseName));
    return animals;
  }
}
