/*
 * Providers provided by Angular
 */

import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {APP_ROUTER_PROVIDERS} from './app/app.routes';
import {APP_BASE_HREF} from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


const ENV_PROVIDERS = [];

import {App} from './app/app';

document.addEventListener('DOMContentLoaded', function main(): void {
  bootstrap(App, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...APP_ROUTER_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy }
  ])
  .catch(err => console.error(err));
});
