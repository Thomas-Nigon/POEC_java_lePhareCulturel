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

@Component({
  selector: 'app-event-page-event-card',
  standalone: true,
  imports: [FilterBarComponent, RouterLink, CommonModule],
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
  // hidden = false;
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
}
