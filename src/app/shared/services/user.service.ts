import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../../models/user.model';
import { Observable } from 'rxjs';
import { NewUser } from '../../models/newUser.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getAllUser(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`assets/MOCK_DATA_users.json`);
  }
  createUser(newUser: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>('backendRoute', newUser);
  }
  getUser(): Observable<UserInterface> {
    return this.http.get<UserInterface>(`backenRoute`);
  }
  getUserLocal(): UserInterface {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData ?? '{}') as UserInterface;
  }
}
