import { provideRouter, RouterConfig } from '@angular/router';
import {App} from './app';
import {LoginPage} from './login/login';

const routes: RouterConfig = [
  { path: 'app', component: App},
  { path: 'login', component: LoginPage},
  {
    path: '',
    redirectTo: './app.html',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: './app.html' },
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
