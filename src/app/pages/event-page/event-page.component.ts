import { Component, inject, OnInit } from '@angular/core';
import { EventPageEventCardComponent } from './event-page-event-card/event-page-event-card.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { CommonModule } from '@angular/common';
import { JoinGroupComponent } from './components/join-group/join-group.component';
import { ActivatedRoute } from '@angular/router';
import { ApiEvent } from '../../models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [EventPageEventCardComponent, CreateGroupComponent, CommonModule, JoinGroupComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss',
})
export class EventPageComponent implements OnInit {
  router = inject(ActivatedRoute);
  eventService = inject(EventsService);
  eventId!: number;
  event!: Observable<ApiEvent>;
  hidden!: boolean;
  setHidden(hidden: boolean) {
    this.hidden = hidden;
  }
  hide() {
    this.hidden = !this.hidden;
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.eventId = +params['id'];
      this.eventService.geteventById(this.eventId);
      this.event = this.eventService.event$;
    });
  }
}
