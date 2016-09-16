import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Header} from './header/header';
import {Footer} from './footer/footer';

@Component({
  selector: 'app',
  directives: [Header, Footer, ROUTER_DIRECTIVES],
  template: require('./core.html'),
  encapsulation: ViewEncapsulation.None
})
export class Core {
}
