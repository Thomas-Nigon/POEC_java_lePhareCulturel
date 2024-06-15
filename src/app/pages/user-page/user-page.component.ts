import { Component } from '@angular/core';
import { ProfilComponent } from './components/profil/profil.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [ProfilComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {}
