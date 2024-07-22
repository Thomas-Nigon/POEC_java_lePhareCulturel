import { Component, inject, OnInit } from '@angular/core';
import { SingleMessageCardComponent } from './components/single-message-card/single-message-card.component';
import { MessagesService } from '../../shared/services/messages.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { messageInterface } from '../../models/message.model';
import { GroupService } from '../../shared/services/group.service';
import { GroupInterface } from '../../models/group.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [SingleMessageCardComponent, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  scroller = inject(ViewportScroller);
  messageService = inject(MessagesService);
  groupService = inject(GroupService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  messageList!: messageInterface[];
  groupList!: GroupInterface[];
  groupId!: number;
  currentMessage!: string;
  showQuitButton = false;
  userMessage = this.fb.group({
    userMessage: ['', [Validators.required, Validators.minLength(1)]],
  });
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = +params['groupId'];
    });
    this.messageService.getMessagesByGroup().subscribe(messages => {
      this.messageList = messages;
      this.groupService.getAllGroups().subscribe(data => {
        this.groupList = data;
      });
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
