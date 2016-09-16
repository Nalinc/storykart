import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Header} from './core/header/header';
import {Footer} from './core/footer/footer';

@Component({
  selector: 'body',
  directives: [Header, Footer, ROUTER_DIRECTIVES],
  template: require('./app.html'),
  styles: [require('../styles/app.scss')],
  encapsulation: ViewEncapsulation.None
})
export class App {
}
