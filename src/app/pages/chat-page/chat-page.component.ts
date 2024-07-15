import { Component } from '@angular/core';
import { SingleMessageCardComponent } from './components/single-message-card/single-message-card.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [SingleMessageCardComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent {}
