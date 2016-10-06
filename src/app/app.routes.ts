import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Core} from './core/core';
import {Home} from './home/home';
import {Dashboard} from './dashboard/dashboard';
import {Story} from './core/story/story.component';

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
    path: 'story/:id',
    component: Story,
    data: {
      title: 'View Story'
    }
  },
  { 
    path: '', 
    component: Home 
  },
  { path: '**', component: Home }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);