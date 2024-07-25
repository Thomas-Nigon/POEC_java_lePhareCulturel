import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { CreateGroupComponent } from './pages/event-page/components/create-group/create-group.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event/:id',
    component: EventPageComponent,
  },
  {
    path: 'event/:id/groups/:groupId',
    component: ChatPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    component: SearchPageComponent,
    children: [
      {
        path: ':date',
        component: SearchPageComponent,
      },
      { path: ':category', component: SearchPageComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'group', component: CreateGroupComponent },

  /* {
    path: '**',
    redirectTo: '',
  }, */
];
