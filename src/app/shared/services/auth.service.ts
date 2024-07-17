import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userLoginInterface } from '../../models/loginModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  userLogin(userCredetials: userLoginInterface) {
    this.http.post<userLoginInterface>('backendRoute', userCredetials);
    this.isLoggedInSubject.next(true);
  }
  logOut() {
    this.isLoggedInSubject.next(false);
  }
}
