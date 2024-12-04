export interface Animal {
  id?: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  image: string;
  ownerId: string; // FK User
}
