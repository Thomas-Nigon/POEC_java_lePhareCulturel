import { Component, inject, OnInit } from '@angular/core';
import { SingleMessageCardComponent } from './components/single-message-card/single-message-card.component';
import { MessagesService } from '../../shared/services/messages.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { messageInterface } from '../../models/message.model';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [SingleMessageCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  scroller = inject(ViewportScroller);
  messageList!: messageInterface[];
  messageService = inject(MessagesService);
  fb = inject(FormBuilder);
  currentMessage!: string;
  userMessage = this.fb.group({
    userMessage: ['', [Validators.required, Validators.minLength(1)]],
  });
  ngOnInit() {
    this.messageService.getMessagesByGroup().subscribe(messages => {
      this.messageList = messages;
    });
  }
  submitMessage() {
    this.currentMessage = this.userMessage.value.userMessage ?? '';
    this.messageList.push({
      id: this.messageList.length + 1,
      user: {
        id: 101,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        avatar: '/assets/images/avatars/avatar1.svg',
      },
      message: this.userMessage.value.userMessage ?? '',
      date: new Date().toLocaleString(),
      group: 1,
    });
    this.userMessage.reset();
  }
}
