import { Component, inject, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule, NgClass } from '@angular/common';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarDate } from '../../models/calendarDate.model';
import { FilterBarComponent } from '../homepage/components/filter-bar/filter-bar.component';
import { EventsService } from '../../shared/services/events.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { Router } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PaginationDummyService } from '../../shared/services/pagination-dummy.service';
import { ApiEvent } from '../../models/event.model';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, NgClass, FilterBarComponent, EventCardComponent, InfiniteScrollDirective],
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
  eventList: ApiEvent[] = [];

  /////////////////////////////////

  isLoading = false;
  currentPage = 0;
  itemsPerPage = 20;

  toggleLoading = () => (this.isLoading = !this.isLoading);

  // it will be called when this component gets initialized.
  loadData = (size: number = this.itemsPerPage, page: number = this.currentPage) => {
    this.toggleLoading();
    this.eventService.getAllEventsbackend(size, page).subscribe({
      next: data => {
        console.warn('my data', data);
        this.eventList = data.events;
        console.warn('my event list', this.eventList);
      },
      error: err => {
        console.error(err);
      },
      complete: () => this.toggleLoading(),
    });
  };

  appendData = () => {
    this.toggleLoading();
    this.eventService.getAllEventsbackend(this.itemsPerPage, this.currentPage).subscribe({
      next: data => {
        console.warn('my data', data);
        this.eventList = [...this.eventList, ...data.events];
        console.warn('my event list', this.eventList);
      },
      error: err => {
        console.error(err);
      },
      complete: () => this.toggleLoading(),
    });
  };

  onScroll = () => {
    console.warn('scrolling');
    this.currentPage++;
    this.appendData();
  };

  constructor(private paginationService: PaginationDummyService) {}

  ngOnInit() {
    this.loadData();
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

  /*   getAllEventsBackend() {
    this.eventService.geteventById(4).subscribe(data => {
      console.warn(data);
    });
  }
  geteventById() {
    this.eventService.geteventById(4).subscribe(data => {
      console.warn(data);
    });
  }
  getGroupListByEvent() {
    this.eventService.getGroupListByEvent(4).subscribe(data => {
      console.warn(data);
    });
  }
  getSingleGroupByEvent() {
    this.eventService.getSingleGroupByEvent(4, 1).subscribe(data => {
      console.warn(data);
    });
  } */
}
