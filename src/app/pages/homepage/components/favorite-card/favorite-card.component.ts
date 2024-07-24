import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
})
export class FavoriteCardComponent {}
