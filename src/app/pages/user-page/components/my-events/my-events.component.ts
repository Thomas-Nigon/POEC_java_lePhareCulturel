import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { EventInterface } from '../../../../models/event.model';
import { EventCardComponent } from '../../../../components/event-card/event-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
})
export class MyEventsComponent {
  router = inject(Router);
  incomingEvents = true;
  @Input() eventList: EventInterface[] = [];
  onClickIncoming() {
    this.incomingEvents = true;
  }
  onClickpast() {
    this.incomingEvents = false;
  }
  onClick() {
    this.router.navigate(['/event', 1]).catch((error: unknown) => {
      console.error(error);
    });
  }
}
