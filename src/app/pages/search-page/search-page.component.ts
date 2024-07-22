import { Component, inject, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule, NgClass } from '@angular/common';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarDate } from '../../models/calendarDate.model';
import { FilterBarComponent } from '../homepage/components/filter-bar/filter-bar.component';
import { EventsService } from '../../shared/services/events.service';
import { EventInterface } from '../../models/event.model';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, NgClass, FilterBarComponent, EventCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  isOpen = true;
  clickedDate!: string;
  date!: Date;
  displayDate = 'Une date en particulier ?';

  router = inject(Router);
  eventService = inject(EventsService);
  eventList!: EventInterface[];

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(data => (this.eventList = data));
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    firstDay: 1,
    titleFormat: { year: 'numeric', month: 'short' },
    windowResizeDelay: 1,
    handleWindowResize: true,
    dateClick: arg => {
      this.handleDateClick(arg);
    },
    locale: 'fr',
    buttonText: {
      today: "Aujourd'hui",
    },
    events: {
      url: '/assets/test.json',
      color: 'yellow', // an option!
      textColor: 'black', // an option!
    },

    plugins: [dayGridPlugin, interactionPlugin],
  };

  onClick() {
    this.isOpen = !this.isOpen;
  }
  handleDateClick(arg: CalendarDate) {
    this.date = new Date(arg.date);
    this.clickedDate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(this.date);
    this.displayDate = this.clickedDate.charAt(0).toUpperCase() + this.clickedDate.slice(1);
    this.isOpen = false;
    this.router
      .navigate(['/events', this.clickedDate])
      .then(() => {})
      .catch((err: unknown) => {
        console.error(err);
      });
  }
}

/*


    events: [
      {
        // this object will be "parsed" into an Event Object
        title: 'Piscine', // a property!
        start: '2024-06-18', // a property!
        end: '2024-06-18',
        backgroundColor: '#378006', // a property! ** see important note below about 'end' **
      },
      {
        // this object will be "parsed" into an Event Object
        title: 'Aquaa Poneyyy', // a property!
        start: '2024-06-19', // a property!
        end: '2024-06-19', // a property! ** see important note below about 'end' **
      },
      {
        // this object will be "parsed" into an Event Object
        title: 'Aperow', // a property!
        start: '2024-06-20', // a property!
        end: '2024-06-20', // a property! ** see important note below about 'end' **
      },
      {
        title: this.eventList[0]?.event_name,
        start: this.eventList[0]?.event_date,
        end: this.eventList[0]?.event_date,
      },
    ],
*/
