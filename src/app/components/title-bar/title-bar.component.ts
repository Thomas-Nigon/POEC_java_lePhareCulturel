import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-title-bar',

  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],

  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss',
})
export class TitleBarComponent {
  authService = inject(AuthService);
  isLoggedIn$ = this.authService.isLoggedIn();

  constructor(private router: Router) {
    this.authService.logoutEvent.subscribe(loggedOut => {
      if (loggedOut && this.router.url === '/user') {
        this.router.navigate(['/']).catch(() => {
          console.error('Error redirecting to /');
        });
        void Swal.fire({
          title: 'Session expirée',
          text: 'Votre session a expiré, veuillez vous reconnecter',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    });
  }
}
