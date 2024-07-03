import { Component } from '@angular/core';
import { EventPageEventCardComponent } from './event-page-event-card/event-page-event-card.component';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [EventPageEventCardComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss',
})
export class EventPageComponent {}
