/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserLoginInterface } from '../../models/loginModel';
import { UserInterface } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private user = new BehaviorSubject<UserInterface | null>(null);
  public user$: Observable<UserInterface | null> = this.user.asObservable();

  private http = inject(HttpClient);
  private router = inject(Router);

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

  isLoggedIn(): boolean {
    return this.user.getValue() !== null;
  }

  userLogin(userCredentials: UserLoginInterface): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(`${this.apiUrl}/auth/sign-in`, userCredentials, { withCredentials: true })
      .pipe(
        tap(response => {
          console.warn('User logged in successfully:', response);
        }),
        catchError(this.handleError),
        map(data => {
          this.user.next(data);
          return data;
        })
      );
  }

  logOut(): void {
    this.user.next(null);
    this.http.post<unknown>(`${this.apiUrl}/auth/sign-out`, {}, { withCredentials: true }).subscribe();
  }

  refreshToken(): Observable<unknown> {
    if (!this.user.getValue()) {
      return throwError(() => new Error('User is not logged in'));
    }
    return this.http.post<unknown>(`${this.apiUrl}/auth/token/refresh`, {}, { withCredentials: true }).pipe(
      tap(response => {
        console.info('Tokens refreshed successfully', response);
      }),
      catchError(error => {
        this.user.next(null);
        return throwError(() => new Error(error.message || 'Token refresh error'));
      })
    );
  }

  initializeAuthState(): Observable<void> {
    return this.http.get<UserInterface>(`${this.apiUrl}/auth/status`, { withCredentials: true }).pipe(
      tap(response => {
        this.user.next(response);
      }),
      map(() => void 0), // Convert UserInterface to void
      catchError(() => {
        this.user.next(null);
        return of(void 0); // Return an Observable<void>
      })
    );
  }

  handleUnauthorized() {
    console.log('Utilisateur non autorisé, redirection vers la page de connexion.');
  }
}
