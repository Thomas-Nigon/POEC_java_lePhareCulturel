import { Component, Input } from '@angular/core';
import { GroupInterface } from '../../../../models/group.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss',
})
export class GroupCardComponent {
  @Input() group!: GroupInterface;
}
