import { provideRouter, RouterConfig } from '@angular/router';
import {App} from './app';
import {Home} from './home/home';
import {Dashboard} from './dashboard/dashboard';

const routes: RouterConfig = [
  {
    path: 'app',
    component: App,
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'home', component: Home}
    ]
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/app/home' },
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
