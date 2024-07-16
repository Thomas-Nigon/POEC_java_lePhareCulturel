import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { messageInterface } from '../../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private http = inject(HttpClient);

  getMessagesByGroup(): Observable<messageInterface[]> {
    return this.http.get<messageInterface[]>('assets/chat.json');
  }
}
