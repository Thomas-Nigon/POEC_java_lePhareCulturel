import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule, NgClass } from '@angular/common';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarDate } from '../../models/calendarDate.model';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, NgClass],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  isOpen = true;
  clickedDate!: string;
  date!: Date;
  displayDate = 'Une date en Particulier?';

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
    ],
    plugins: [dayGridPlugin, interactionPlugin],
  };

  ngOnInit(): void {
    /*  this.displayDate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date());
    this.displayDate = this.displayDate.charAt(0).toUpperCase() + this.displayDate.slice(1); */
  }

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
  }
}
