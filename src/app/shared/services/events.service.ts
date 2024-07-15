import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EventInterface } from '../../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private http = inject(HttpClient);

  getAllEvents() {
    return this.http.get<EventInterface[]>('assets/mokarooEvents.json');
  }
}
