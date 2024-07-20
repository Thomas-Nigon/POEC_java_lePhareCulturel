import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditAvatarComponent } from '../edit-avatar/edit-avatar.component';
import { MyInfoComponent } from '../my-info/my-info.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { UserProfileInterface } from '../../../../models/user-profile-interface.model';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterLink, CommonModule, EditAvatarComponent, MyInfoComponent, EditPasswordComponent, RouterOutlet],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  authService = inject(AuthService);
  router = inject(Router);
  @Input() userId!: number;
  @Input() userList!: UserProfileInterface[];
  @Input() myUser!: UserProfileInterface;
  path: string | null = 'home';

  onClick(event: Event) {
    const buttonName = (event.target as HTMLInputElement).getAttribute('name');
    this.path = buttonName;
  }
  logout() {
    this.authService.logOut();
    this.router
      .navigate([''])
      .then(() => {})
      .catch((error: unknown) => {
        console.error(error);
      });
  }
}
