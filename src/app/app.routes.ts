import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'event/:id', component: EventPageComponent },
  { path: 'user/:id', component: UserPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: '**',
    redirectTo: 'home',
  },
];
