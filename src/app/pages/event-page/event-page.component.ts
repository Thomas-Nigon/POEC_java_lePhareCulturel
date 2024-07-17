import { Component } from '@angular/core';
import { EventPageEventCardComponent } from './event-page-event-card/event-page-event-card.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { CommonModule } from '@angular/common';
import { JoinGroupComponent } from './components/join-group/join-group.component';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [EventPageEventCardComponent, CreateGroupComponent, CommonModule, JoinGroupComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss',
})
export class EventPageComponent {
  hidden!: boolean;
  setHidden(hidden: boolean) {
    this.hidden = hidden;
  }
  hide() {
    this.hidden = !this.hidden;
  }
}
