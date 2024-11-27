export interface User {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  age: number;
  username: string;
  password: string;
  phone: string;
  createdAt?: Date; // auto generated
  rol: string; // FK Rol
  animals?: string[]; // FK Animal
}
