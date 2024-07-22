import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FilterBarComponent } from '../../homepage/components/filter-bar/filter-bar.component';
import { EventsService } from '../../../shared/services/events.service';
import { EventInterface } from '../../../models/event.model';
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
  eventList!: EventInterface[];
  userList!: UserInterface[];
  eventTest!: EventInterface[];
  notLogged = false;
  @Output() testhidden = new EventEmitter<boolean>();
  @Input() hidden!: boolean;
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

  options: MapOptions = {
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
