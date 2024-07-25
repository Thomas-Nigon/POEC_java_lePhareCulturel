import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageInterface } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private http = inject(HttpClient);

  getMessagesByGroup(): Observable<MessageInterface[]> {
    return this.http.get<MessageInterface[]>('assets/chat.json');
  }
}
