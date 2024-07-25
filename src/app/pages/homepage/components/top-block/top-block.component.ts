import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-top-block',
  standalone: true,
  imports: [IonIcon, RouterLink, CommonModule],
  templateUrl: './top-block.component.html',
  styleUrl: './top-block.component.scss',
})
export class TopBlockComponent {
  scroller = inject(ViewportScroller);

  onClick() {
    this.scroller.scrollToAnchor('about-us');
  }
  openInstagram() {
    window.location.href = 'https://www.instagram.com/lephareculturel/';
  }

  openFacebook() {
    window.location.href = 'https://www.facebook.com/profile.php?id=61563414295164';
  }

  openTwitter() {
    window.location.href = 'https://x.com/lephareculturel';
  }
}
