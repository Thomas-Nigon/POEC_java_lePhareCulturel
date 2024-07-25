import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiEvent } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent implements OnInit {
  @Input() eventList: Event[] = [];
  @Input() event!: ApiEvent;
  router = inject(Router);
  targetId!: number | null;
  beginDate!: Date;
  endDate!: Date;
  isoStartDateString!: Date;
  isoEndDateString!: Date;
  localeStartDateString!: string;
  localeEndDateString!: string;

  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  onClick(event: Event) {
    const clickedId: string | null = (event.target as HTMLInputElement).getAttribute('id');
    this.targetId = clickedId ? parseInt(clickedId) : 0;

    this.router.navigate(['/event', this.targetId]).catch((error: unknown) => {
      console.error(error);
    });
  }
  ngOnInit() {
    this.isoStartDateString = this.event.first_timing.begin;
    this.beginDate = new Date(this.isoStartDateString);
    this.localeStartDateString =
      this.beginDate.toLocaleString(undefined, this.options).charAt(0).toUpperCase() +
      this.beginDate.toLocaleString(undefined, this.options).slice(1);
    this.isoEndDateString = this.event.last_timing.begin;
    this.endDate = new Date(this.isoEndDateString);
    this.localeEndDateString =
      this.endDate.toLocaleString(undefined, this.options).charAt(0).toUpperCase() +
      this.endDate.toLocaleString(undefined, this.options).slice(1);
  }
}
