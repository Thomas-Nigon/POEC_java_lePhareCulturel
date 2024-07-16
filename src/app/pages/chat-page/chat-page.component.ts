import { Component, inject, OnInit } from '@angular/core';
import { SingleMessageCardComponent } from './components/single-message-card/single-message-card.component';
import { MessagesService } from '../../shared/services/messages.service';
import { messageInterface } from '../../models/chat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [SingleMessageCardComponent, CommonModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  messageList!: messageInterface[];
  messageService = inject(MessagesService);
  ngOnInit() {
    this.messageService.getMessagesByGroup().subscribe(messages => {
      this.messageList = messages;
    });
  }
}
