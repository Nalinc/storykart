import {Component, HostListener} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'app-header',
    template: require('./header.html')
})

export class Header {
	mode:string = "maximized";
	isHome:string;

	@HostListener('window:scroll', ['$event']) 
	shrinkHeader(event) {
		if(this.mode != "hide-header"){
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
	};

	constructor(private router: Router) {
	}

	ngOnInit() {
		this.router.events.subscribe(event => {
			if(event instanceof NavigationStart) {
				if(event.url == "/dashboard"){
					jQuery('header, .page-wrap').addClass('scrolled')
					this.mode = "hide-header";				
				}else if(event.url == "/"){
					jQuery(document).scrollTop(0);
					jQuery('header, .page-wrap').removeClass('scrolled');
					this.mode = "maximized";
				}
			}
		});	
	}
}
