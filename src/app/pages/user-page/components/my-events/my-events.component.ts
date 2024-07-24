import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventCardComponent } from '../../../../components/event-card/event-card.component';
import { EventFutureOrLast } from '../../../../models/event_future_or_last.model';
import { UserService } from '../../../../shared/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, EventCardComponent, RouterLink],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
})
export class MyEventsComponent {
  incomingEvents = true;
  userService = inject(UserService);
  events!: Observable<EventFutureOrLast>;

  constructor() {
    this.userService.getMyEventsFutureOrLast();
    this.events = this.userService.myEvents$;
  }

  onClickIncoming() {
    this.incomingEvents = true;
  }
  onClickpast() {
    this.incomingEvents = false;
  }
}
