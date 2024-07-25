/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiEvent, EventInterface, EventResponse } from '../../models/event.model';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CoupDeCoeur } from '../../models/coupDeCoeur.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  public event: BehaviorSubject<ApiEvent> = new BehaviorSubject<ApiEvent>({} as ApiEvent);
  public event$: Observable<ApiEvent> = this.event.asObservable();

  getCoupDeCoeur() {
    return this.http.get<CoupDeCoeur[]>('assets/coupDeCoeur.json');
  }
  getAllEvents(size: number, page: number) {
    const params = {
      size: size.toString(),
      page: page.toString(),
    };
    return this.http.get<EventResponse>(`${this.apiUrl}/events?`, { params });
  }
  geteventById(id: number) {
    return this.http
      .get<ApiEvent>(`${this.apiUrl}/events/${id}`)
      .pipe(
        tap(data => {
          this.event.next(data);
        })
      )
      .subscribe();
  }
  getRandomEvent() {
    return this.http.get<ApiEvent>(`${this.apiUrl}/events/random`);
  }

  getGroupListByEvent(id: number) {
    return this.http.get<EventInterface[]>(`${this.apiUrl}/events/${id}/groups`);
  }
  getSingleGroupByEvent(eventId: number, groupId: number) {
    return this.http.get<EventInterface[]>(`${this.apiUrl}/events/${eventId}/groups/${groupId}`);
  }
}
