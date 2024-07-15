import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-top-block',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './top-block.component.html',
  styleUrl: './top-block.component.scss',
})
export class TopBlockComponent {
  scroller = inject(ViewportScroller);
  onClick() {
    this.scroller.scrollToAnchor('about-us');
  }
}
