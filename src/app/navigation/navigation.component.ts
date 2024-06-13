import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
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
