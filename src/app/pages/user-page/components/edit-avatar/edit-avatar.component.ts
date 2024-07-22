/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, Input, OnInit, inject } from '@angular/core';
import { AvatarService } from '../../../../shared/services/avatar.service';
import { AvatarInterface } from '../../../../models/avatar.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../shared/services/user.service';
import { EditAvatarInterface } from '../../../../models/editAvatar.model';
import { UserInterface } from '../../../../models/user.model';

@Component({
  selector: 'app-edit-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.scss',
})
export class EditAvatarComponent implements OnInit {
  @Input() myUser!: UserInterface;
  private avatarService = inject(AvatarService);
  private userService = inject(UserService);
  avatarList!: AvatarInterface[];
  selectedId = 0;
  newAvatar!: EditAvatarInterface;

  ngOnInit() {
    this.avatarService.getAvatarList().subscribe(data => {
      this.avatarList = data;
      this.newAvatar = {
        url: this.avatarList[this.selectedId].url,
      };
    });
  }

  onClick(event: Event) {
    const avatarUrl = (event.target as HTMLInputElement).getAttribute('name');
    this.newAvatar.url = avatarUrl ?? '';
    const avatarId = (event.target as HTMLInputElement).getAttribute('id');
    this.selectedId = avatarId ? parseInt(avatarId) - 1 : 0;
    this.userService.editUserAvatar(this.newAvatar).subscribe({
      next: response => {
        console.warn('edit avatar successful:', response);
        this.myUser.avatar = this.newAvatar.url;
      },
      error: err => {
        if (err.status !== 401) {
          console.error('Error occurred:', err);
        }
      },
    });
  }
}
