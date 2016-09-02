import {Component, HostListener} from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'app-header',
    directives: [RouterLink],
    template: require('./header.html')
})

export class Header {
	mode:string = "maximized";
	@HostListener('window:scroll', ['$event']) 
	shrinkHeader(event) {
		if(jQuery(document).scrollTop() > 50){
			jQuery('header').addClass('smaller')
			this.mode = "minified";
		}
		else{
			jQuery('header').removeClass('smaller')
			this.mode = "maximized";
		}
	}
}
