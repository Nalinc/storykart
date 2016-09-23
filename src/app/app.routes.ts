import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Core} from './core/core';
import {Home} from './home/home';
import {Dashboard} from './dashboard/dashboard';

const appRoutes: Routes = [
  {
    path: 'home',
    component: Home,
    data: {
      title: 'Home page'
    }
  },
  {
    path: 'dashboard',
    component: Dashboard,
    data: {
      title: 'Dashboard'
    }
  },
  { 
    path: '', 
    component: Home 
  },
  { path: '**', component: Home }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);