import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Core} from './core';
import {Home} from '../home/home';
import {Dashboard} from '../dashboard/dashboard';

const coreRoutes: Routes = [
  {
    path: 'app',
    component: Core,
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'home', component: Home}
    ]
  }
];

export const CoreRoutes: ModuleWithProviders = RouterModule.forChild(coreRoutes);