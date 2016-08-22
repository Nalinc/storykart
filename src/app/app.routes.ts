import { provideRouter, RouterConfig } from '@angular/router';
import {App} from './app';
import {CoreRoutes} from './core/core.routes';

const routes: RouterConfig = [
	...CoreRoutes,
	{
		path: '',
		redirectTo: '/app/home',
		pathMatch: 'full'
	},
	{
		path: '**', 
		redirectTo: '/app/home' 
	}
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
