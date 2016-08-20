import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'body',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.html'),
  styles: [require('../css/core.css')],
  encapsulation: ViewEncapsulation.None
})
export class App {
}
