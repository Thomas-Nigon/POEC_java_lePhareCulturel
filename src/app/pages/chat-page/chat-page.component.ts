import { Component, inject, Input, OnInit } from '@angular/core';
import { SingleMessageCardComponent } from './components/single-message-card/single-message-card.component';
import { MessagesService } from '../../shared/services/messages.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageGroupInterface } from '../../models/message.model';
// import { cookieInterceptor } from '../../shared/interceptors/cookie.interceptor';
// import { error } from '@angular/compiler-cli/src/transformers/util';
import { UserProfileInterface } from '../../models/user-profile-interface.model';
import { AppUiMessage } from '../../shared/app.ui-message';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [SingleMessageCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  scroller = inject(ViewportScroller);
  // ... sould be an Observable / subscribed ??
  public _messageList: MessageGroupInterface[] | null = null;
  // ... sould be an Observable / subscribed ??
  public userProfileparticipant: UserProfileInterface[] | null = null;

  @Input()
  groupID = 1;
  @Input()
  groupUID = '10X1OX1OX1O';

  messageService = inject(MessagesService);

  formBuilder = inject(FormBuilder);

  currentMessageText!: string;

  formGroup = this.formBuilder.group({
    userMessage: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2048)]],
  });

  ngOnInit() {
    this.getMessagesDatas();
  }

  /* ****** ****** ****** ****** */
  public getMessagesDatas() {
    this.messageService.getMessagesByGroupUID(this.groupUID).subscribe(messages => {
      this._messageList = messages;
      this.userProfileparticipant = null;
    });
    this.messageService.getUsersByGroupUID(this.groupUID).subscribe(UsersInDatGroupParticipant => {
      this.userProfileparticipant = UsersInDatGroupParticipant;
    });
  }

  /* ****** ****** ****** ****** */
  public set setMessageList(value: MessageGroupInterface[] | null) {
    if (value == null || value.length == 0) {
      console.error(AppUiMessage.ERROR_MESSAGES.ERROR_MESSAGE);
      throw new Error(AppUiMessage.ERROR_MESSAGES.ERROR_MESSAGE);
    }
    if (this._messageList == null) {
      this._messageList = [];
    }
    this._messageList = value;
  }

  /* ****** ****** ****** ****** */
  public messageList(): MessageGroupInterface[] | null {
    return this._messageList;
  }

  /* ****** ****** ****** ****** */
  public messageListPush(value: MessageGroupInterface | null) {
    if (this._messageList == null) {
      this._messageList = [];
    }

    if (value == null) {
      throw new Error(AppUiMessage.ERROR_MESSAGES.NULL_VALUE_MESSAGES);
    }

    this._messageList.push(value);
  }

  /* ****** ****** ****** ****** */
  public getCurrentMessageText(): string {
    return this.currentMessageText;
  }

  // This will return the instance of MessageGroupInterface as per requirement, update as per your proper implementation
  public getCurrentMessage(): MessageGroupInterface {
    // substitute {} with your actual implementation to generate a MessageGroupInterface
    // to ensure that the returned data is aligned with the declared return type.
    const newMessageToSend: MessageGroupInterface = {
      messageID: null,
      MessageUID: null,
      groupID: this.groupID,
      groupUID: this.groupUID,
      message: this.getCurrentMessageText(),
      message_previous_version: null,
      message_uid_response: null,
      date_created: null,
      date_deleted: null,
      date_modified: null,
      medias: null,
      user_profile: {
        userUID: null,
        firstname: null,
        lastname: null,
        nickname: null,
        email: null,
        avatar: null,
        description: null,
        isLogged: null,
      },
    };
    newMessageToSend.groupUID = this.groupUID;
    newMessageToSend.groupID = this.groupID;
    newMessageToSend.message = this.getCurrentMessageText();
    return newMessageToSend;
  }

  /* ****** ****** ****** ****** */
  submitNewMessage() {
    this.currentMessageText = this.formGroup.value.userMessage ?? '';

    this.messageService.submitMessagesByGroup(
      this.groupUID,
      this.getCurrentMessage(),
      () => {
        // success callback
        this.messageListPush(this.getCurrentMessage());
      },
      () => {
        // error callback
        throw new Error(AppUiMessage.ERROR_MESSAGES.ERROR_SAVE_CONTENT);
      }
    );
  }
}
