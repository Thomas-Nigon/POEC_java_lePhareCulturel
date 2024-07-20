import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AvatarInterface } from '../../models/avatar.model';
import { RouteDefinition } from '../../RouteDefinition';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private http = inject(HttpClient);
  getAvatarList() {
    // .... 'assets/images/avatars/avatarList.json'
    return this.http.get<AvatarInterface[]>(RouteDefinition.Users.AVATAR_LIST);
  }
}
