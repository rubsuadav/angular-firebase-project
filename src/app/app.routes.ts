import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { anonymousGuard } from './guards/anonymous.guard';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [anonymousGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [anonymousGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authenticatedGuard] },
];
