import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  directives: [
    ROUTER_DIRECTIVES,
  ],
  selector: '[home]',
  host: {
    class: 'home-page'
  },
  template: require('./home.html')
})
export class Home {
	names:string[] = ["one", "two", "three"];
}
