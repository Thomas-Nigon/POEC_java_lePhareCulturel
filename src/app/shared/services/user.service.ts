import { Injectable } from '@angular/core';
import { UserProfileInterface } from '../../models/user-profile-interface.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserRegistrationData } from '../../models/user-registration-data.models';
import { UserEditProfileInterface } from '../../models/editUser.model';
import { UserEditProfileAvatarInterface } from '../../models/editAvatar.model';
import { RouteDefinition } from '../../RouteDefinition';
import { CustomHttpApiService } from './custom-http-api.service';
import { AvatarInterface } from '../../models/avatar.model';
import { AppUiMessage } from '../app.ui-message';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CustomHttpApiService {
  getAllUser(): Observable<UserProfileInterface[]> {
    return throwError(() => new Error('Niet'));
  }

  createUser(newUser: UserRegistrationData): Observable<UserRegistrationData> | null {
    return this.http.post<UserRegistrationData>(RouteDefinition.Auth.REGISTER_URL, newUser).pipe(
      tap((response: UserRegistrationData) => {
        console.warn(AppUiMessage.SUCCESS_MESSAGES.SUCCESS_CREATE_MESSAGE, response);
      }),
      catchError(this.handleError)
    );

  }

  getUserLocal(): UserProfileInterface {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData ?? '{}') as UserProfileInterface;
  }

  editUser(editedUser: UserEditProfileInterface): Observable<UserEditProfileInterface> | null {
    return this.http
      .put<UserEditProfileInterface>(RouteDefinition.Users.PROFILE_URL, editedUser, { withCredentials: true })
      .pipe(
        tap((response: UserEditProfileInterface) => {
          console.warn(AppUiMessage.SUCCESS_MESSAGES.SUCCESS_EDIT_MESSAGE, response);
        }),
        catchError(this.handleError)
      );
  }

  /* ****** ****** ****** ****** */
  editUserAvatar(newAvatar: AvatarInterface): Observable<UserEditProfileAvatarInterface> {
    return this.http.put(RouteDefinition.Users.AVATAR_URL, newAvatar, { withCredentials: true }).pipe(
      tap((response: UserEditProfileAvatarInterface) => {
        console.warn(AppUiMessage.SUCCESS_MESSAGES.SUCCESS_EDIT_MESSAGE, response);
      }),
      catchError(this.handleError)
    );
  }
}
