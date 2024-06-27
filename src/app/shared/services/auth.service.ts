import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = true;

  private connected = false;
  private role = 'admin';
  getRole() {
    return this.role;
  }
  checkRole(): string {
    return this.role;
  }
  isConnected(): boolean {
    return this.connected;
  }
  logIn(): boolean {
    return (this.connected = true);
  }
  logOut(): boolean {
    return (this.connected = false);
  }
}
