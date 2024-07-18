import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AvatarInterface } from '../../models/avatar.model';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private http = inject(HttpClient);
  getAvatarList() {
    return this.http.get<AvatarInterface[]>('assets/images/avatars/avatarList.json');
  }
}
