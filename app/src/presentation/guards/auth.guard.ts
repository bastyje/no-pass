import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isSignedIn()) {
    return true;
  }

  inject(Router).navigate([ '/', 'login' ], { queryParams: { redirectUrl: state.url } }).then();
  return false;
};
