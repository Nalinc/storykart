import {Component} from '@angular/core';

@Component({
  selector: '[home]',
  host: {
    class: 'home-page'
  },
  template: require('./home.html')
})
export class Home {
	names:string[] = ["one", "two", "three"];
}
