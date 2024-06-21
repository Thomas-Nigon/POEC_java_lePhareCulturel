import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    HomepageComponent,
    UserPageComponent,
    SearchPageComponent,
    EventPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    TitleBarComponent,
    RouterLink,
    RouterLinkActive,
    FullCalendarModule,
    NavigationComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Le phare culturel';
}
