import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getAllUser(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`assets/MOCK_DATA_users.json`);
  }
}
