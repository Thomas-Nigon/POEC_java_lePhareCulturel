import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupInterface } from '../../models/group.model';
import { NewGroupInterface } from '../../models/newGroup.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllGroups(): Observable<GroupInterface[]> {
    return this.http.get<GroupInterface[]>('assets/groups.json');
  }
  createGroup(NewGroup: NewGroupInterface, eventId: string): Observable<NewGroupInterface> {
    return this.http.post<NewGroupInterface>(`${this.apiUrl}/events/${eventId}/groups`, NewGroup);
  }
}
