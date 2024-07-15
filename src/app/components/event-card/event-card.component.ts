import { Component, Input, inject } from '@angular/core';
import { EventInterface } from '../../models/event.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() eventList: EventInterface[] = [];
  @Input() event!: EventInterface;
  router = inject(Router);
  targetId!: number | null;
  onClick(event: Event) {
    const clickedId: string | null = (event.target as HTMLInputElement).getAttribute('id');
    this.targetId = clickedId ? parseInt(clickedId) - 1 : 0;

    this.router.navigate(['/event', this.targetId]).catch((error: unknown) => {
      console.error(error);
    });
  }
}
