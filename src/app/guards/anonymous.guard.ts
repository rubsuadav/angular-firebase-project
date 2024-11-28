import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const anonymousGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (!localStorage.getItem('access_token')) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
