import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FilterBarComponent } from '../../homepage/components/filter-bar/filter-bar.component';
import { EventsService } from '../../../shared/services/events.service';
import { ApiEvent, EventInterface } from '../../../models/event.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { UserInterface } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { circle, icon, latLng, MapOptions, marker, polygon, tileLayer } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

@Component({
  selector: 'app-event-page-event-card',
  standalone: true,
  imports: [FilterBarComponent, RouterLink, CommonModule, LeafletModule],
  templateUrl: './event-page-event-card.component.html',
  styleUrl: './event-page-event-card.component.scss',
})
export class EventPageEventCardComponent implements OnInit {
  authService = inject(AuthService);
  eventService = inject(EventsService);
  userService = inject(UserService);

  @Input() event!: ApiEvent;
  @Input() eventId = 0;
  @Input() hidden!: boolean;
  @Output() testhidden = new EventEmitter<boolean>();

  eventList!: EventInterface[];
  userList!: UserInterface[];
  eventTest!: EventInterface[];
  notLogged = false;

  beginDate!: Date;
  endDate!: Date;
  isoStartDateString!: Date;
  isoEndDateString!: Date;
  localeStartDateString!: string;
  localeEndDateString!: string;

  dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  private route = inject(ActivatedRoute);

  eventDate!: string;
  ngOnInit() {
    /*     this.eventService.getAllEvents().subscribe(data => {
      this.eventList = data;
    });
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
    });
    this.userService.getAllUser().subscribe(data => {
      this.userList = data;
    }); */
    this.isoStartDateString = this.event.first_timing.begin;
    this.beginDate = new Date(this.isoStartDateString);
    this.localeStartDateString =
      this.beginDate.toLocaleString(undefined, this.dateOptions).charAt(0).toUpperCase() +
      this.beginDate.toLocaleString(undefined, this.dateOptions).slice(1);
    this.isoEndDateString = this.event.last_timing.begin;
    this.endDate = new Date(this.isoEndDateString);
    this.localeEndDateString =
      this.endDate.toLocaleString(undefined, this.dateOptions).charAt(0).toUpperCase() +
      this.endDate.toLocaleString(undefined, this.dateOptions).slice(1);
  }
  onClick() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.hidden = true;

        this.testhidden.emit(this.hidden);
      } else {
        this.notLogged = true;
        void Swal.fire({
          icon: 'warning',
          title: 'Connexion requise',
          text: 'Vous devez etre connecté pour rejoindre un groupe',
        });
      }
    });
  }

  mapOptions: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })],
    zoom: 16,
    center: latLng(50.633159, 3.020264),
  };
  layers = [
    circle([46.95, -122], { radius: 5000 }),
    polygon([
      [46.8, -121.85],
      [46.92, -121.92],
      [46.87, -121.8],
    ]),
    marker([50.633159, 3.020264], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png',
      }),
    }),
  ];
}
