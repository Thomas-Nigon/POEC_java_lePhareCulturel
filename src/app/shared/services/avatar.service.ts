import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Avatar } from '../../models/avatar.model';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private http = inject(HttpClient);
  getAvatarList() {
    return this.http.get<Avatar[]>('assets/images/avatars/avatarList.json');
  }
}
