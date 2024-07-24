import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GroupCardComponent } from '../group-card/group-card.component';
import { ApiEvent, Group } from '../../../../models/event.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-join-group',
  standalone: true,
  imports: [CommonModule, GroupCardComponent],
  templateUrl: './join-group.component.html',
  styleUrl: './join-group.component.scss',
})
export class JoinGroupComponent implements OnInit {
  @Input() event!: Observable<ApiEvent>;
  hideJoinGroup = false;
  groupList!: Group[];

  ngOnInit() {
    this.event.subscribe(event => {
      this.groupList = event.groups;
    });
  }

  onClick() {
    this.hideJoinGroup = !this.hideJoinGroup;
  }
}
