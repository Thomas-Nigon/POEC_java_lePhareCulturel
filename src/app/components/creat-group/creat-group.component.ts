import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creat-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creat-group.component.html',
  styleUrl: './creat-group.component.scss',
})
export class CreatGroupComponent {
  hideCreateGroup = true;

  onClick() {
    this.hideCreateGroup = !this.hideCreateGroup;
  }
}
