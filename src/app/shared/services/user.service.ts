import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../../models/user.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { NewUser } from '../../models/newUser.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllUser(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`assets/MOCK_DATA_users.json`);
  }
  createUser(newUser: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(`${this.apiUrl}/auth/sign-up`, newUser).pipe(
      tap((response: NewUser) => {
        console.warn('User created successfully:', response);
      }),
      catchError(this.handleError)
    );
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
  getUserLocal(): UserInterface {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData ?? '{}') as UserInterface;
  }
}
