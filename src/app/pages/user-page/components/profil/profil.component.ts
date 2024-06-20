import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../../models/user.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  @Input() userId!: number;
  @Input() userList!: UserInterface[];
}
