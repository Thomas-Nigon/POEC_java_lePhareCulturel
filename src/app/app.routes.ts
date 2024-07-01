import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CreatGroupComponent } from './components/creat-group/creat-group.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'event/:id', component: EventPageComponent },
  { path: 'user/:id', component: UserPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'create-group', component: CreatGroupComponent },
  { path: '', redirectTo: '/create-group', pathMatch: 'full' },

  {
    path: '**',
    redirectTo: '',
  },
];
