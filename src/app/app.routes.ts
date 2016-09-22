import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Core} from './core/core';
import {Home} from './home/home';
import {Dashboard} from './dashboard/dashboard';

const appRoutes: Routes = [
  {
    path: 'app',
    component: Core,
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'home', component: Home}
    ]
  },
  {
    path: 'app/home',
    component: Home,
    data: {
      title: 'Home page'
    }
  },
  { 
    path: '', 
    component: Home 
  },
  { path: '**', component: Home }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);