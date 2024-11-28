import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(
    protected authService: FirebaseAutenticationService,
    protected router: Router
  ) {}

  protected register(user: U) {
    this.authService
      .registerUser(user)
      .then(async (res: User) => {
        this.error = '';
        localStorage.setItem('access_token', await res.getIdToken());
        const alert = await Swal.fire({
          title: 'Success',
          text: 'User registered successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        if (alert.isConfirmed) this.router.navigate(['/home']);
      })
      .catch((err: string) => {
        this.error = err;
      });
  }
}
