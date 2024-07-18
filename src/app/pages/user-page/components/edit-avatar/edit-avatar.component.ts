import { Component, OnInit, inject } from '@angular/core';
import { AvatarService } from '../../../../shared/services/avatar.service';
import { AvatarInterface } from '../../../../models/avatar.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-edit-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.scss',
})
export class EditAvatarComponent implements OnInit {
  private avatarService = inject(AvatarService);
  private userService = inject(UserService);
  avatarList!: AvatarInterface[];
  selectedId = 0;
  newAvatar!: string;

  ngOnInit() {
    this.avatarService.getAvatarList().subscribe(data => {
      this.avatarList = data;
    });
  }

  onClick(event: Event) {
    const avatarUrl = (event.target as HTMLInputElement).getAttribute('name');
    this.newAvatar = avatarUrl ?? '';
    const avatarId = (event.target as HTMLInputElement).getAttribute('id');
    this.selectedId = avatarId ? parseInt(avatarId) - 1 : 0;
    this.userService.editUserAvatar(this.newAvatar).subscribe({
      next: response => {
        console.warn('User added:', response);
      },
      error: err => {
        console.error('Error occurred:', err);
      },
    });
  }
}
