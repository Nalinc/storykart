import {Component, HostListener} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'script-builder',
    template: require('./scriptbuilder.html')
})

export class ScriptBuilder {
	removeMode:boolean = false;
	scriptArray:any;

	constructor(private router: Router) {
		this.scriptArray=[{
			"boy_1":"Hello World_1",
			"boy_2":"Hello World_2"
		},{
			"girl_3":"Hello World_3"
		}
		]
	}

	ngOnInit() {

	}
}
