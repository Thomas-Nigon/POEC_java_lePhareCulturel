import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { userLoginInterface } from '../../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private myUser = new BehaviorSubject<UserInterface>({
    firstname: '',
    lastname: '',
    email: '',
    description: '',
    picture: '',
    nickname: '',
    isLogged: false,
  });
  public myUser$: Observable<UserInterface> = this.myUser.asObservable();

  private http = inject(HttpClient);
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }
  login() {
    this.isLoggedInSubject.next(true);
  }

  userLogin(userCredentials: userLoginInterface): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(`${this.apiUrl}/auth/sign-in`, userCredentials, { withCredentials: true })
      .pipe(
        map(data => {
          this.myUser.next({ ...data, isLogged: true });
          localStorage.setItem('user', JSON.stringify({ ...data, isLogged: true }));
          return data;
        })
      );
  }
  logOut() {
    this.isLoggedInSubject.next(false);
  }
}
