import { Component } from '@angular/core';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FilterBarComponent, AboutUsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
