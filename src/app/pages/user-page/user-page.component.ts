import { Component, inject, OnInit } from '@angular/core';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { EventsService } from '../../shared/services/events.service';
import { EventInterface } from '../../models/event.model';
import { ProfilComponent } from './components/profil/profil.component';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from '../../models/user.model';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [ProfilComponent, MyEventsComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  private userService = inject(UserService);
  private eventService = inject(EventsService);
  eventList!: EventInterface[];
  private route = inject(ActivatedRoute);
  userId!: number;
  testId!: number;
  userList!: UserInterface[];
  ngOnInit() {
    this.userService.getAllUser().subscribe(data => {
      this.userList = data;
    });
    this.route.params.subscribe(params => {
      this.userId = +params['id']; //log the value of id
    });
    this.eventService.getAllEvents().subscribe(data => {
      this.eventList = data;
    });
  }
}
