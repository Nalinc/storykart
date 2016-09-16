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
		var scrollAmt:any = jQuery(document).scrollTop();
		if(scrollAmt > 50){
			jQuery('header, .page-wrap').addClass('scrolled')
			this.mode = "minified";
		}
		else{
			jQuery('header, .page-wrap').removeClass('scrolled')
			this.mode = "maximized";
		}
	}
}
