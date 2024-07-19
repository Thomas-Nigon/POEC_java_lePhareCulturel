/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const cookieInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => next(req)),
          catchError(err => {
            authService.logOut();
            return throwError(() => new Error(err.message || 'Token refresh failed'));
          })
        );
      } else {
        return throwError(() => new Error(error.message || 'Request error'));
      }
    })
  );
};
