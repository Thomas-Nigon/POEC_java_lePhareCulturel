import { Component, OnInit, inject } from '@angular/core';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventsService } from '../../shared/services/events.service';
import { EventInterface } from '../../models/event.model';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FilterBarComponent, AboutUsComponent, EventCardComponent, FavoriteCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  eventService = inject(EventsService);
  eventList!: EventInterface[];

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(data => {
      this.eventList = data;
    });
  }
}
