import {Component, AfterViewInit} from '@angular/core';
declare var jQuery: any;

@Component({
  selector: '[story]',
  host: {
    class: 'story-page'
  },  
  template: require('./story.html')
})
export class Story {
	constructor(){

	}
	ngAfterViewInit() {
	}	
}