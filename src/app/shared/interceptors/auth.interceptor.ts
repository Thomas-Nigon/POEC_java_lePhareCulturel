/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error: any) => {
      if (error.status === 401 && !authReq.url.includes('/auth/token/refresh')) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => new Error(error.message));
    })
  );
};

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null);

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((token: unknown) => {
        isRefreshing = false;
        refreshTokenSubject.next(token);
        return next(request);
      }),
      catchError(err => {
        isRefreshing = false;
        authService.logOut();
        return throwError(() => new Error(err.message));
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(() => next(request))
    );
  }
}
