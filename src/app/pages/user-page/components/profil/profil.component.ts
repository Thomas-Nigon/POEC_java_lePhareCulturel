import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../../models/user.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditAvatarComponent } from '../edit-avatar/edit-avatar.component';
import { MyInfoComponent } from '../my-info/my-info.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterLink, CommonModule, EditAvatarComponent, MyInfoComponent],
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
