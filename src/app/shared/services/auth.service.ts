/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  interval,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserLoginInterface } from '../../models/loginModel';
import { UserInterface } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private myUser = new BehaviorSubject<UserInterface>(this.getInitialUser());
  public myUser$: Observable<UserInterface> = this.myUser.asObservable();

  private http = inject(HttpClient);
  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public logoutEvent = new BehaviorSubject<boolean>(false);

  private authCheckSubscription: Subscription | null = null; // Propriété pour stocker l'intervalle

  constructor() {
    this.initializeAuthState().subscribe();
  }

  private getInitialUser(): UserInterface {
    return {
      firstname: '',
      lastname: '',
      email: '',
      description: '',
      avatar: '',
      nickname: '',
      isLogged: false,
    };
  }

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

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  login(): void {
    this.isLoggedInSubject.next(true);
    this.startAuthCheckTimer();
  }

  userLogin(userCredentials: UserLoginInterface): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(`${this.apiUrl}/auth/sign-in`, userCredentials, { withCredentials: true })
      .pipe(
        tap(response => {
          console.warn('User logged in successfully:', response);
          this.isLoggedInSubject.next(true);
          this.login();
        }),
        catchError(this.handleError)
        /* map(data => {
          this.myUser.next({ ...data, isLogged: true });
          localStorage.setItem('user', JSON.stringify({ ...data, isLogged: true }));
          this.login();
          return data;
        }) */
      );
  }

  logOut(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('user');
    this.setUserState(this.getInitialUser(), false);
    this.logoutEvent.next(true);
    this.stopAuthCheckTimer(); // Arrêter l'intervalle lors de la déconnexion
  }

  refreshToken(): Observable<unknown> {
    return this.http.post<unknown>(`${this.apiUrl}/auth/token/refresh`, {}, { withCredentials: true }).pipe(
      tap(response => {
        console.info('Tokens refreshed successfully', response);
        this.isLoggedInSubject.next(true);
      }),
      catchError(error => {
        this.logOut();
        return throwError(() => new Error(error.message || 'Token refresh error'));
      })
    );
  }

  initializeAuthState(): Observable<void> {
    return this.http.get<UserInterface>(`${this.apiUrl}/auth/status`, { withCredentials: true }).pipe(
      tap(response => {
        this.setUserState(response, true);
        this.isLoggedInSubject.next(true);
      }),
      catchError(() => {
        this.setUserState(this.getInitialUser(), false);
        // return throwError(() => new Error('Failed to initialize auth state'));
        return new Observable<never>();
      }),
      map(() => void 0) // Convertir en Observable<void>
    );
  }

  private setUserState(user: UserInterface, isLogged: boolean): void {
    this.myUser.next({ ...user, isLogged });
    localStorage.setItem('user', JSON.stringify({ ...user, isLogged }));
    this.isLoggedInSubject.next(isLogged);
  }

  private startAuthCheckTimer(): void {
    if (!this.authCheckSubscription) {
      this.authCheckSubscription = interval(environment.intervalCheckAuth)
        .pipe(
          switchMap(() =>
            this.checkAuthStatus().pipe(
              catchError(error => {
                console.error('Auth status check failed:', error.message);
                return of(); // Retourne une observable vide pour continuer le timer
              })
            )
          )
        )
        .subscribe();
    }
  }

  private stopAuthCheckTimer(): void {
    if (this.authCheckSubscription) {
      this.authCheckSubscription.unsubscribe();
      this.authCheckSubscription = null;
    }
  }

  private checkAuthStatus(): Observable<void> {
    return this.http.get<UserInterface>(`${this.apiUrl}/auth/status`, { withCredentials: true }).pipe(
      tap(response => {
        if (!response.email) {
          this.logOut();
        }
      }),
      catchError(() => {
        this.logOut();
        return throwError(() => new Error('Failed to verify auth status'));
      }),
      map(() => void 0)
    );
  }
}
