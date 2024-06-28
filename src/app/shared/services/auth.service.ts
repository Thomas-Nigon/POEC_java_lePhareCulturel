import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  // Function to get the current login state
  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  // Function to log in the user
  logIn() {
    this.isLoggedInSubject.next(true);
  }

  // Function to log out the user
  logOut() {
    this.isLoggedInSubject.next(false);
  }
}
