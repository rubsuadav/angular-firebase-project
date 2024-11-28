import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'login',
  standalone: true,
})
export class LoginPipe implements PipeTransform {
  transform(value: object | string): string {
    return value.toString().replace('FirebaseError: Firebase: ', '');
  }
}
