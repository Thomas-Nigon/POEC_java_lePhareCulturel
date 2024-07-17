import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userLoginInterface } from '../../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tempUser: UserInterface = {
    id: 1,
    first_name: 'thomas',
    last_name: 'niiiiig ',
    email: 'thomas.nigon@hotmail.fr',
    picture: 'assets/images/avatars/avatar10.svg',
    description: 'coucou',
  };
  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  userLogin(userCredentials: userLoginInterface): Observable<userLoginInterface> {
    this.isLoggedInSubject.next(true);
    localStorage.setItem('user', JSON.stringify(this.tempUser));
    return this.http.post<userLoginInterface>('http://localhost:8080/api/v1/auth/sign-in', userCredentials);
  }
  logOut() {
    this.isLoggedInSubject.next(false);
  }
}
