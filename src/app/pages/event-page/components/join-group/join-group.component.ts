import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GroupCardComponent } from '../group-card/group-card.component';
import { GroupInterface } from '../../../../models/group.model';
import { GroupService } from '../../../../shared/services/group.service';

@Component({
  selector: 'app-join-group',
  standalone: true,
  imports: [CommonModule, GroupCardComponent],
  templateUrl: './join-group.component.html',
  styleUrl: './join-group.component.scss',
})
export class JoinGroupComponent implements OnInit {
  hideJoinGroup = false;
  groupList!: GroupInterface[];
  groupService = inject(GroupService);
  ngOnInit() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groupList = data;
    });
  }

  onClick() {
    this.hideJoinGroup = !this.hideJoinGroup;
  }
}
