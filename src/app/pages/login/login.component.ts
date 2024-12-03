import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// local imports
import { FirebaseAutenticationService } from '../../services/firebase-autentication.service';
import { User as U } from '../../models/user';
import { LoginPipe } from './login.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LoginPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected user: U = {} as U;
  protected error: string = '';

  constructor(
    protected authService: FirebaseAutenticationService,
    protected router: Router
  ) {}

  protected login(email: string, password: string) {
    this.authService
      .login(email, password)
      .then(async (res: User) => {
        this.error = '';
        localStorage.setItem('access_token', await res.getIdToken());
        const alert = await Swal.fire({
          title: 'Success',
          text: 'Loging successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        if (alert.isConfirmed) {
          window.location.reload();
          this.router.navigate(['/home']);
        }
      })
      .catch((err: string) => {
        this.error = err;
      });
  }

  protected loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then((token: string | undefined) => {
        localStorage.setItem('access_token', token as string);
        window.location.reload();
        this.router.navigate(['/home']);
      })
      .catch((err: any) => {
        this.error = err.code || err.message || err.customData.email;
      });
  }
}
