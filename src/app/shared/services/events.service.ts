import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EventInterface } from '../../models/event.model';
import { RouteDefinition } from '../../RouteDefinition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private http = inject(HttpClient);

  getAllEvents() {
    // .... 'assets/mokarooEvents.json'
    const url = RouteDefinition.Events.EVENTS_URL;
    return this.http.get<EventInterface[]>(url);
  }
  getEventsByID(eventID: number): Observable<EventInterface[]> {
    // .... 'assets/mokarooEvents.json'
    const url = RouteDefinition.Events.EVENTS_WITH_ID_URL.replace(RouteDefinition.Events.ID_TAG, String(eventID));
    return this.http.get<EventInterface[]>(url);
  }
}
