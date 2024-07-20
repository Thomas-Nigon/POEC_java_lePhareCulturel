import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorReq = req.clone();
  return next(errorReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Handle 401 Unauthorized errors
      }
      console.error('HTTP Error Interceptor:', error.message);
      return throwError(error);
    })
  );
};
