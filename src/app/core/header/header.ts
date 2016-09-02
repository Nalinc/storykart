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
	maxScrollAmt:any = jQuery(document).height() - jQuery(window).height();

	@HostListener('window:scroll', ['$event']) 
	shrinkHeader(event) {
		var scrollAmt:any = jQuery(document).scrollTop();
		var	maxScrollAmt:any = jQuery(document).height() - jQuery(window).height();
		if(scrollAmt > 50 && scrollAmt < maxScrollAmt){
			jQuery('header, .page-wrap, footer').addClass('scrolled')
			this.mode = "minified";
		}
		else if(scrollAmt == maxScrollAmt){
			jQuery('footer').removeClass('scrolled')
			this.mode = "minified";
		}
		else{
			jQuery('header, .page-wrap, footer').removeClass('scrolled')
			this.mode = "maximized";
		}
	}
}
