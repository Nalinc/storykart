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
	addDialogue: any;

	constructor(public dashboardInstance: Dashboard) {
		this.storyScript= dashboardInstance.storyScript;
		this.updateDialogue = function(ev, index, actor){
			dashboardInstance.updateDialogue(index, actor, ev.target.value);
		}
		this.deleteDialogue = function(index, actor){
			var ele = jQuery('.jigsawContainer .jigsaw')[index];
			if(jQuery(ele).find('.parallel').length > 1)
				jQuery(ele).find('.parallel[data-name='+actor+']').remove();
			else
				jQuery(ele).remove();
			dashboardInstance.deleteDialogue(index, actor);
		}
		this.addDialogue = function(index, actor, dialogue){
			this.removeMode=false;
			dashboardInstance.addDialogue();
		}		
	}

}
