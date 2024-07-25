/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, inject, OnInit } from '@angular/core';
import { SingleMessageCardComponent } from './components/single-message-card/single-message-card.component';
//import { MessagesService } from '../../shared/services/messages.service';
import { CommonModule, Location, ViewportScroller } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageInterface } from '../../models/message.model';
//import { GroupService } from '../../shared/services/group.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { Observable } from 'rxjs';
import { GroupInterface } from '../../models/group.model';
import { GroupService } from '../../shared/services/group.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [SingleMessageCardComponent, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  scroller = inject(ViewportScroller);
  /*   messageService = inject(MessagesService);*/
  groupService = inject(GroupService);
  eventService = inject(EventsService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  public location = inject(Location);

  messageList!: MessageInterface[];
  // groupList!: GroupInterface[];
  groupId!: number;
  eventId!: number;
  currentMessage!: string;
  showQuitButton = false;
  userMessage = this.fb.group({
    userMessage: ['', [Validators.required, Validators.minLength(1)]],
  });

  public group: Observable<GroupInterface | null> = this.groupService.group$;

  constructor() {
    this.groupId = +this.route.snapshot.params['groupId'];
    this.eventId = +this.route.snapshot.params['id'];

    this.groupService.getGroupById(this.groupId.toString());
  }
  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.groupId = +params['groupId'];
    // });
    // this.route.params.subscribe(params => {
    //   this.eventId = +params['id'];
    // });
    /*   this.messageService.getMessagesByGroup().subscribe(messages => {
      this.messageList = messages;
      this.groupService.getAllGroups().subscribe(data => {
        this.groupList = data;
      });
    }); */
    /*  this.eventService.geteventById(this.eventId).subscribe(data => {
      this.messageList = data.messages;
    }); */
  }
  onClick() {
    this.location.back();
  }
  submitMessage() {
    this.currentMessage = this.userMessage.value.userMessage ?? '';
    // this.messageList.push({
    //   id: this.messageList.length + 1,
    //   user: {
    //     id: 101,
    //     first_name: 'John',
    //     last_name: 'Doe',
    //     email: 'john.doe@example.com',
    //     avatar: '/assets/images/avatars/avatar1.svg',
    //   },
    //   message: this.userMessage.value.userMessage ?? '',
    //   date: new Date().toLocaleString(),
    //   group: 1,
    // });
    this.userMessage.reset();
  }
}
