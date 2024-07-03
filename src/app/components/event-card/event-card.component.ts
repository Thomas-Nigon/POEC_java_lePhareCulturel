import { Component, Input, inject } from '@angular/core';
import { EventInterface } from '../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() eventList: EventInterface[] = [];
  router = inject(Router);

  onClick() {
    this.router.navigate(['/event', 1]).catch((error: unknown) => {
      console.error(error);
    });
  }
}
