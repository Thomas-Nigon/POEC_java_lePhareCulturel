import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AvatarService } from '../../../../shared/services/avatar.service';
import { Avatar } from '../../../../models/avatar.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.scss',
})
export class EditAvatarComponent implements OnInit, OnDestroy {
  private avatarService = inject(AvatarService);
  avatarList!: Avatar[];
  selectedId = 0;

  ngOnInit() {
    this.avatarService.getAvatarList().subscribe(data => {
      this.avatarList = data;
    });
  }

  onClick(event: Event) {
    const avatarId = (event.target as HTMLInputElement).getAttribute('id');
    this.selectedId = avatarId ? parseInt(avatarId) : 0;
  }
  ngOnDestroy() {
    console.warn('send picture to DB');
  }
}
