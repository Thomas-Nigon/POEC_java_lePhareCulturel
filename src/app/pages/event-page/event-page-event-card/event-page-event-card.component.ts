import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map, MapOptions, Marker, icon, latLng, marker, tileLayer } from 'leaflet';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiEvent } from '../../../models/event.model';
import { AuthService } from '../../../shared/services/auth.service';
import { EventsService } from '../../../shared/services/events.service';
import { UserService } from '../../../shared/services/user.service';
import { FilterBarComponent } from '../../homepage/components/filter-bar/filter-bar.component';

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

  @Input() event!: Observable<ApiEvent>;
  @Input() hidden!: boolean;
  @Output() testhidden = new EventEmitter<boolean>();

  notLogged = false;
  beginDate!: Date;
  endDate!: Date;
  isoStartDateString!: Date;
  isoEndDateString!: Date;
  localeStartDateString!: string;
  localeEndDateString!: string;

  mapOptions!: MapOptions;
  map!: Map;
  eventMarker!: Marker;

  eventDate!: string;

  dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  ngOnInit(): void {
    this.event.subscribe(event => {
      this.isoStartDateString = event.first_timing.begin;
      this.beginDate = new Date(this.isoStartDateString);
      this.localeStartDateString =
        this.beginDate.toLocaleString(undefined, this.dateOptions).charAt(0).toUpperCase() +
        this.beginDate.toLocaleString(undefined, this.dateOptions).slice(1);

      this.isoEndDateString = event.last_timing.begin;
      this.endDate = new Date(this.isoEndDateString);
      this.localeEndDateString =
        this.endDate.toLocaleString(undefined, this.dateOptions).charAt(0).toUpperCase() +
        this.endDate.toLocaleString(undefined, this.dateOptions).slice(1);

      this.mapOptions = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '© OpenStreetMap contributors',
          }),
        ],
        zoom: 16,
        center: latLng(event.location.coordinates.lat, event.location.coordinates.lon),
      };
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.event.subscribe(event => {
      this.eventMarker = marker([event.location.coordinates.lat, event.location.coordinates.lon], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png',
        }),
      });
      this.map.setView(latLng(event.location.coordinates.lat, event.location.coordinates.lon), 16);
      this.eventMarker.addTo(this.map);
    });
  }

  onClick() {
    this.authService.user$.subscribe(user => {
      if (user) {
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
}
