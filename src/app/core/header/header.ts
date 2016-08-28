import {Component, HostListener} from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'app-header',
    directives: [RouterLink],
    template: require('./header.html')
})

export class Header {
	names:string = "";
	@HostListener('window:scroll', ['$event']) 
	shrinkHeader(event) {
		if(jQuery(document).scrollTop() > 50){
			jQuery('header').addClass('smaller')
		}
		else{
			jQuery('header').removeClass('smaller')
		}
	}
}
