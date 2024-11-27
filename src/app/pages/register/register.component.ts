import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';

// local imports
import { FirebaseAutenticationService } from '../../services/firebase-autentication.service';
import { User as U } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  protected user: U = {} as U;
  protected error: string = '';

  constructor(protected authService: FirebaseAutenticationService) {}

  protected register(user: U) {
    this.authService.registerUser(user).then((res: User) => {
      console.log('response from firebase', res);
    });
  }
}
