import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EventInterface } from '../../../../models/event.model';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule],
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
