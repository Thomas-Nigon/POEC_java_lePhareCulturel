import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroupInterface } from '../../models/group.model';
import { NewGroupInterface } from '../../models/newGroup.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  private group = new BehaviorSubject<GroupInterface | null>(null);
  public group$ = this.group.asObservable();

  // getAllGroups(): Observable<GroupInterface[]> {
  //   return this.http.get<GroupInterface[]>(`${this.apiUrl}/groups`);
  // }

  getGroupById(groupId: string) {
    this.http
      .get<GroupInterface>(`${this.apiUrl}/groups/${groupId}`)
      .pipe(
        tap(group => {
          this.group.next(group);
        })
      )
      .subscribe();
  }
  createGroup(NewGroup: NewGroupInterface, eventId: string): Observable<NewGroupInterface> {
    return this.http.post<NewGroupInterface>(`${this.apiUrl}/events/${eventId}/groups`, NewGroup);
  }
}
