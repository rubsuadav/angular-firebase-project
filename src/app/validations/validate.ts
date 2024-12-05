import { Animal } from '../models/animal';
import { User } from '../models/user';

export function handleValidationUser(user: User): string {
  let error = '';
  if (!user.name || user.name.length < 3) {
    error = 'Name must be at least 3 characters long';
  }
  if (!user.lastname || user.lastname.length < 3) {
    error = 'Lastname must be at least 3 characters long';
  }
  if (
    !/^[a-zA-Z0-9._-]+@[gmail|hotmail|yahoo|outlook]+.com$/.test(user.email)
  ) {
    error = 'Email must be gmail, hotmail, yahoo, outlook';
  }
  if (user.age <= 0) {
    error = 'Age must be greater than 0';
  }
  if (!user.username || user.username.length < 6) {
    error = 'Username must be at least 6 characters long';
  }
  if (!user.password || user.password.length < 6) {
    error = 'Password must be at least 6 characters long';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/.test(
      user.password
    )
  ) {
    error =
      'Password must have 1 capital letter, 1 lowercase letter, 1 number and 1 special character';
  }
  if (!/^(6|7)[0-9]{8}$/.test(user.phone)) {
    error = 'Phone must be a spanish phone number';
  }
  if (!user.rol) {
    error = 'Rol must be selected';
  } else if (user.rol !== 'admin' && user.rol !== 'authenticated') {
    error = 'Rol must be "admin" or "authenticated"';
  }

  return error;
}

export function handleValidationAnimal(animal: Animal): string {
  let error = '';
  if (!animal.name || animal.name.length < 3) {
    error = 'Name must be at least 3 characters long';
  }
  if (!animal.age || animal.age <= 0) {
    error = 'Animals must be at least 1 month old';
  }
  if (!animal.weight || animal.weight <= 0) {
    error = 'Weight must be greater than 0';
  }
  if (!animal.height || animal.height <= 0) {
    error = 'Height must be greater than 0';
  }
  if (
    !animal.image ||
    !/^(http|https):\/\/[^ "]+\.(png|jpg|jpeg)$/.test(animal.image)
  ) {
    error = 'Image must be a valid URL';
  }
  return error;
}
