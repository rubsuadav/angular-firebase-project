import { User } from '../models/user';

export function handleValidationUser(user: User): string {
  let error = '';
  if (user.name.length < 6) {
    error = 'Name must be at least 3 characters long';
  }
  if (user.lastname.length < 6) {
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
  if (user.username.length < 6) {
    error = 'Username must be at least 6 characters long';
  }
  if (user.password.length < 6) {
    error = 'Password must be at least 6 characters long';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/.test(
      user.password
    )
  ) {
    error =
      'Password must have 1 capital letter, 1 lowercase letter, 1 number and 1 special character';
  }
  if (!/^\d{10}$/.test(user.phone)) {
    error = 'Phone must be a number';
  } else if (!/^(6|7)[0-9]{8}$/.test(user.phone)) {
    error = 'Phone must be a spanish phone number';
  }
  if (!user.rol) {
    error = 'Rol must be selected';
  } else if (user.rol !== 'admin' && user.rol !== 'authenticated') {
    error = 'Rol must be "admin" or "authenticated"';
  }

  return error;
}
