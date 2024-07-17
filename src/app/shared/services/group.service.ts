import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupInterface } from '../../models/group.model';
import { NewGroupInterface } from '../../models/newGroup.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);

  getAllGroups(): Observable<GroupInterface[]> {
    return this.http.get<GroupInterface[]>('assets/groups.json');
  }
  createGroup(NewGroup: NewGroupInterface): Observable<NewGroupInterface> {
    return this.http.post<NewGroupInterface>('backendRoute', NewGroup);
  }
}
