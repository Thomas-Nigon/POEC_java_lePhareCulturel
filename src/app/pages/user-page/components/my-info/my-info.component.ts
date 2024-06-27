import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../../models/user.model';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.scss',
})
export class MyInfoComponent {
  @Input() userList: UserInterface[] = [];
  @Input() userId = 0;
}
