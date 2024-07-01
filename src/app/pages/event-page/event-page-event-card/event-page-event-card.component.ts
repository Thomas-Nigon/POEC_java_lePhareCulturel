import { Component, OnInit, inject } from '@angular/core';
import { FilterBarComponent } from '../../homepage/components/filter-bar/filter-bar.component';
import { EventsService } from '../../../shared/services/events.service';
import { EventInterface } from '../../../models/event.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-page-event-card',
  standalone: true,
  imports: [FilterBarComponent],
  templateUrl: './event-page-event-card.component.html',
  styleUrl: './event-page-event-card.component.scss',
})
export class EventPageEventCardComponent implements OnInit {
  eventService = inject(EventsService);
  eventList!: EventInterface[];
  eventId!: number;
  private route = inject(ActivatedRoute);
  ngOnInit() {
    this.eventService.getAllEvents().subscribe(data => {
      this.eventList = data;
    });
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; //log the value of id
    });
  }
}
