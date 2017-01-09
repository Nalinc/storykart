import {Component, HostListener} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'script-builder',
    template: require('./scriptbuilder.html')
})

export class ScriptBuilder {
	removeMode:boolean = false;

	constructor(private router: Router) {
	}

	ngOnInit() {

	}
}
