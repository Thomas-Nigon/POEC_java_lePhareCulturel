import { Component, Input } from '@angular/core';
import { EventInterface } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() eventList: EventInterface[] = [];
}
