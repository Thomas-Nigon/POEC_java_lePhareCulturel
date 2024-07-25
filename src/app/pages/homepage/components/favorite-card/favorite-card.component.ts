import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoupDeCoeur } from '../../../../models/coupDeCoeur.model';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
})
export class FavoriteCardComponent {
  @Input() coupDeCoeur!: CoupDeCoeur;
}
