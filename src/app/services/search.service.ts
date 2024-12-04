import { Injectable } from '@angular/core';
import { collection, getDocs, query, where } from 'firebase/firestore';

// local imports
import { FIREBASE_DB } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  public async searchAnimalsByName(name: string): Promise<any> {
    if (!name) throw new Error('Name is required');
    const animalQuery = query(
      collection(FIREBASE_DB, 'animals'),
      where('name', 'array-contains', name)
    );
    const querySnapshot = await getDocs(animalQuery);
    const animals = querySnapshot.docs.map((doc) => doc.data());
    return animals;
  }
}
