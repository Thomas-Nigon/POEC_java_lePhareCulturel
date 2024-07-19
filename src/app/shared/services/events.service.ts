import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EventInterface } from '../../models/event.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllEvents() {
    return this.http.get<EventInterface[]>('assets/mokarooEvents.json');
  }
  getAllEventsbackend() {
    return this.http.get<EventInterface[]>(`${this.apiUrl}/events`);
  }
  geteventById(id: number) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return this.http.get<EventInterface[]>(`${this.apiUrl}/events/${id}`);
  }
  getGroupListByEvent(id: number) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return this.http.get<EventInterface[]>(`${this.apiUrl}/events/${id}/groups`);
  }
  getSingleGroupByEvent(eventId: number, groupId: number) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return this.http.get<EventInterface[]>(`${this.apiUrl}/events/${eventId}/groups/${groupId}`);
  }
}
