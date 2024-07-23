import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../../models/user.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { NewUser } from '../../models/newUser.models';
import { environment } from '../../../environments/environment';
import { EditedUserInterface } from '../../models/editUser.model';
import { EditAvatarInterface } from '../../models/editAvatar.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  public myUser: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>({} as UserInterface);
  public myUser$: Observable<UserInterface> = this.myUser.asObservable();

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
  getUser() {
    {
      return this.http
        .get<UserInterface>(`${this.apiUrl}/users/profile`, { withCredentials: true })
        .pipe(
          tap((response: UserInterface) => {
            this.myUser.next(response);
            console.warn('User fetched successfully:', response);
          }),
          catchError(this.handleError)
        )
        .subscribe();
    }
  }
  getUserLocal(): UserInterface {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData ?? '{}') as UserInterface;
  }

  editUser(editedUser: EditedUserInterface): Observable<EditedUserInterface> {
    return this.http
      .put<EditedUserInterface>(`${this.apiUrl}/users/profile`, editedUser, { withCredentials: true })
      .pipe(
        tap((response: EditedUserInterface) => {
          console.warn('User edited successfully:', response);
        }),
        catchError(this.handleError)
      );
  }
  editUserAvatar(newAvatar: EditAvatarInterface): Observable<EditAvatarInterface> {
    return this.http.put<EditAvatarInterface>(`${this.apiUrl}/users/avatar`, newAvatar, { withCredentials: true }).pipe(
      tap((response: EditAvatarInterface) => {
        console.warn('User edited successfully:', response);
      }),
      catchError(this.handleError)
    );
  }
}
