import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.isConnected()) {
    return true;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.navigate(['/login']);
    return false;
  }
};
