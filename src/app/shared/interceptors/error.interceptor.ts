import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(AuthService);
  const errorReq = req.clone({ withCredentials: true });
  return next(errorReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // authService.handleUnauthorized();
      }
      // console.log('HTTP Error Interceptor:', error.message);
      return throwError(() => new Error(error.message));
    })
  );
};
