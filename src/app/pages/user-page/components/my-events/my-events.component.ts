import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EventInterface } from '../../../../models/event.model';
import { EventCardComponent } from '../../../../components/event-card/event-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, EventCardComponent, RouterLink],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
})
export class MyEventsComponent {
  incomingEvents = true;
  @Input() eventList: EventInterface[] = [];
  onClickIncoming() {
    this.incomingEvents = true;
  }
  onClickpast() {
    this.incomingEvents = false;
  }
}
