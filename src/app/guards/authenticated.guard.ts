import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('access_token')) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
