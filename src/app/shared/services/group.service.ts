import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GroupInterface } from '../../models/group.model';
import { NewGroupInterface } from '../../models/newGroup.model';
import { RouteDefinition } from '../../RouteDefinition';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);

  getAllGroups(): Observable<GroupInterface[]> {
    // .... 'assets/groups.json'
    // return this.http.get<GroupInterface[]>(RouteDefinition.Groups.GROUPS_URL);
    return throwError(() => new Error('Niet'));
  }
  createGroup(NewGroup: NewGroupInterface): Observable<NewGroupInterface> {
    // .... 'backendRoute'
    return this.http.post<NewGroupInterface>( RouteDefinition.Events.EVENTS_WITH_ID_GROUP_LIST_URL, NewGroup);
  }
}
