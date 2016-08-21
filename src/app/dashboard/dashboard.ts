import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  directives: [
    ROUTER_DIRECTIVES,
  ],
  selector: '[dashboard]',
  host: {
    class: 'dashboard-page app'
  },
  template: require('./dashboard.html')
})
export class Dashboard {
}
