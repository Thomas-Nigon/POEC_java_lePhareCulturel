import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { userLoginInterface } from '../../models/loginModel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserInterface } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private myUser = new BehaviorSubject<UserInterface>({
    firstname: '',
    lastname: '',
    email: '',
    description: '',
    avatar: '',
    nickname: '',
    isLogged: false,
  });
  public myUser$: Observable<UserInterface> = this.myUser.asObservable();

  private http = inject(HttpClient);
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status.toString()}, body was: ${(error.error as { error_message: string }).error_message}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }
  login() {
    this.isLoggedInSubject.next(true);
  }

  userLogin(userCredentials: userLoginInterface): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(`${this.apiUrl}/auth/sign-in`, userCredentials, { withCredentials: true })
      .pipe(
        tap(response => {
          console.warn('User logged in successfully:', response);
        }),
        catchError(this.handleError),
        map(data => {
          this.myUser.next({ ...data, isLogged: true });
          localStorage.setItem('user', JSON.stringify({ ...data, isLogged: true }));
          this.login();
          return data;
        })
      );
  }
  logOut() {
    this.isLoggedInSubject.next(false);
  }
}
