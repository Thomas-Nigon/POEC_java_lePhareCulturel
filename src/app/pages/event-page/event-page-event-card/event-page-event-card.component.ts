import { Component, OnInit, inject } from '@angular/core';
import { FilterBarComponent } from '../../homepage/components/filter-bar/filter-bar.component';
import { EventsService } from '../../../shared/services/events.service';
import { EventInterface } from '../../../models/event.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { UserInterface } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-page-event-card',
  standalone: true,
  imports: [FilterBarComponent, RouterLink, CommonModule],
  templateUrl: './event-page-event-card.component.html',
  styleUrl: './event-page-event-card.component.scss',
})
export class EventPageEventCardComponent implements OnInit {
  eventService = inject(EventsService);
  userService = inject(UserService);
  eventList!: EventInterface[];
  userList!: UserInterface[];
  eventTest!: EventInterface[];
  private route = inject(ActivatedRoute);
  eventId!: number;
  eventDate!: string;
  ngOnInit() {
    this.eventService.getAllEvents().subscribe(data => {
      this.eventList = data;
    });
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
    });
    this.userService.getAllUser().subscribe(data => {
      this.userList = data;
    });
  }
}
