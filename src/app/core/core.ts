import {Component, ViewEncapsulation} from '@angular/core';
import {Header} from './header/header';
import {Footer} from './footer/footer';

@Component({
  selector: 'app',
  template: require('./core.html'),
  encapsulation: ViewEncapsulation.None
})
export class Core {
}
