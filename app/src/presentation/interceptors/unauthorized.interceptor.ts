import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStorage = inject(AuthService);
  return next(req)
    .pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        router.navigate([ '/', 'login' ]).then();
        authStorage.signOut();
      }
      return EMPTY;
    }));
}
