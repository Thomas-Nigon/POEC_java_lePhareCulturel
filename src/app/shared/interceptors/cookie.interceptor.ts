import { HttpInterceptorFn } from '@angular/common/http';

export const cookieInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = req.clone({ withCredentials: true });
  return next(cookie);
};
