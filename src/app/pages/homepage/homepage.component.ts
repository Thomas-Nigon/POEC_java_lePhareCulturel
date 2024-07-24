import { Component, OnInit, inject } from '@angular/core';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventsService } from '../../shared/services/events.service';
import { ApiEvent } from '../../models/event.model';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { TopBlockComponent } from './components/top-block/top-block.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    FilterBarComponent,
    AboutUsComponent,
    EventCardComponent,
    FavoriteCardComponent,
    TopBlockComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  eventService = inject(EventsService);
  eventList: ApiEvent[] = [];
  event!: ApiEvent;
  size = 20;
  page = 0;

  ngOnInit() {
    this.eventService.getRandomEvent().subscribe(data => {
      this.event = data;
    });
  }
}
