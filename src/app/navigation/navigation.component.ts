import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavigationComponent implements AfterViewInit {
  ngAfterViewInit() {
    const list = document.querySelectorAll('.list');
    function activeLink(this: HTMLElement) {
      list.forEach(item => {
        item.classList.remove('active');
      });
      this.classList.add('active');
    }
    list.forEach(item => {
      item.addEventListener('click', activeLink);
    });
  }
}
