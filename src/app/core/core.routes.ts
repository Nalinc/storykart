import { provideRouter, RouterConfig } from '@angular/router';
import {Core} from './core';
import {Home} from '../home/home';
import {Dashboard} from '../dashboard/dashboard';

export const CoreRoutes: RouterConfig = [
  {
    path: 'app',
    component: Core,
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'home', component: Home}
    ]
  }
];
