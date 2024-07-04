import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditAvatarComponent } from '../edit-avatar/edit-avatar.component';
import { MyInfoComponent } from '../my-info/my-info.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { EditInfoComponent } from '../edit-info/edit-info.component';
import { UserInterface } from '../../../../models/user.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterLink, CommonModule, EditAvatarComponent, MyInfoComponent, EditInfoComponent, EditPasswordComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  @Input() userId!: number;
  @Input() userList!: UserInterface[];
  path: string | null = 'home';

  onClick(event: Event) {
    const buttonName = (event.target as HTMLInputElement).getAttribute('name');
    this.path = buttonName;
  }
}
