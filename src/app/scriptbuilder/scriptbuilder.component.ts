import {Component, Input} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import { Story } from '../story/story.component';
import { Dashboard } from '../dashboard/dashboard';
declare var jQuery: any;

@Component({
    selector: 'script-builder',
    template: require('./scriptbuilder.html')
})

export class ScriptBuilder {
	removeMode:boolean = false;
	storyScript: any;
	updateDialogue: any;
	deleteDialogue: any;

	constructor(public dashboardInstance: Dashboard) {
		this.storyScript= dashboardInstance.storyScript;
		this.updateDialogue = function(ev, index, actor){
			dashboardInstance.updateDialogue(index, actor, ev.target.value);
		}
		this.deleteDialogue = function(index, actor){
			delete this.storyScript[index][actor];
			console.log(this.storyScript)
			dashboardInstance.deleteDialogue(index, actor);
		}
	}

}
