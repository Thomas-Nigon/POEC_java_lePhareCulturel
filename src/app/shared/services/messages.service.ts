import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { MessageGroupInterface } from '../../models/message.model';
import { RouteDefinition } from '../../RouteDefinition';
import { UserEditProfileAvatarInterface } from '../../models/editAvatar.model';
import { UserProfileInterface } from '../../models/user-profile-interface.model';
import { CustomHttpApiService } from './custom-http-api.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService extends CustomHttpApiService {
  // private http = inject(HttpClient);

  /* ****** ****** ****** ****** */
  public getMessagesByGroupUID(groupUID: string | null): Observable<MessageGroupInterface[]> {
    // ... 'assets/chat.json'
    const url: string = RouteDefinition.Events.GROUP_MESSAGES.GROUP_WITH_UID_MESSAGES_LIST_URL.replace(
      RouteDefinition.Events.GROUP_MESSAGES.UID_TAG,
      String(groupUID)
    );
    return this.http.get<MessageGroupInterface[]>(url);
  }

  /* ****** ****** ****** ****** */
  public getUsersByGroupUID(groupUID: string | null): Observable<UserProfileInterface[]> {
    // ... 'assets/chat.json'
    const url: string = RouteDefinition.Events.GROUP_MESSAGES.GROUP_WITH_UID_USERS_LIST_URL.replace(
      RouteDefinition.Events.GROUP_MESSAGES.UID_TAG,
      String(groupUID)
    );
    return this.http.get<UserProfileInterface[]>(url);
  }

  /* ****** ****** ****** ****** */
  public submitMessagesByGroup(
    groupUID: string,
    messageBody: MessageGroupInterface | null,
    callBack: (callbackarg: any | null) => unknown,
    callBackError: (callbackarg: any | null) => unknown
  ): Observable<MessageGroupInterface[]> | null {
    // ... 'assets/chat.json'
    const url: string = RouteDefinition.Events.GROUP_MESSAGES.GROUP_WITH_UID_MESSAGES_LIST_URL.replace(
      RouteDefinition.Events.GROUP_MESSAGES.ID_TAG,
      String(groupUID)
    );

    return this.http.put<MessageGroupInterface>(url, messageBody, { withCredentials: true }).pipe(
      tap((response: MessageGroupInterface) => {
        console.warn('Message Sent successfully:', response);
        if (null !== callBack) {
          callBack(response);
        }
      }),
      catchError(err => {
        return ((callBackError) ? callBackError(err) : this.handleError(err));
      })
    );
  }
}
