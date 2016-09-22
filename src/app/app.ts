import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'body',
  template: require('./app.html'),
  styles: [require('../styles/app.scss')],
  encapsulation: ViewEncapsulation.None
})
export class App {
}
