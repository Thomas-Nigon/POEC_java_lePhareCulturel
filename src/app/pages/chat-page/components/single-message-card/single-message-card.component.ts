import { Component, Input } from '@angular/core';
import { MessageGroupInterface } from '../../../../models/message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-message-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-message-card.component.html',
  styleUrl: './single-message-card.component.scss',
})
export class SingleMessageCardComponent {
  @Input() message!: MessageGroupInterface;
}
