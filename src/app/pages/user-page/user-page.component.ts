import { Component, inject, OnInit } from '@angular/core';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { EventsService } from '../../shared/services/events.service';
import { EventInterface } from '../../models/event.model';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [MyEventsComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  eventService = inject(EventsService);
  eventList!: EventInterface[];

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(data => {
      this.eventList = data;
    });
  }
}
