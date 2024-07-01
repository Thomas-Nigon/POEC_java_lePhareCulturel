import { Component, OnInit, inject } from '@angular/core';
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
export class EditAvatarComponent implements OnInit {
  private avatarService = inject(AvatarService);
  avatarList!: Avatar[];

  ngOnInit() {
    this.avatarService.getAvatarList().subscribe(data => {
      this.avatarList = data;
    });
  }
}
