import { Component } from '@angular/core';
import { FilterBarComponent } from '../../pages/homepage/components/filter-bar/filter-bar.component';

@Component({
  selector: 'app-creat-group',
  standalone: true,
  imports: [FilterBarComponent],
  templateUrl: './creat-group.component.html',
  styleUrl: './creat-group.component.scss',
})
export class CreatGroupComponent {}
