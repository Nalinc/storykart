import {Component, Input, AfterViewInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import { Story } from '../story/story.component';
import { Dashboard } from '../dashboard/dashboard';
require('jquery-ui/sortable');
declare var jQuery: any;

@Component({
    selector: 'script-builder',
    template: require('./scriptbuilder.html')
})

export class ScriptBuilder {
	removeMode:boolean = false;
	addMode:boolean = false;
	storyScript: any;
	updateDialogue: any;
	deleteDialogue: any;
	addDialogue: any;
	jigsawArray: any;
	initiateSortable: any;

	constructor(private dashboardInstance: Dashboard) {
		this.storyScript= dashboardInstance.storyScript;
		this.updateDialogue = function(ev, actor){
			var sourceIndex = jQuery(ev.target.parentNode.parentNode.parentNode).index();
			dashboardInstance.updateDialogue(sourceIndex, actor, ev.target.value);
		}
		this.deleteDialogue = function(event, actor){
			var sourceIndex = jQuery(event.target.parentNode.parentNode.parentNode).index();
			var ele = jQuery('.jigsawContainer .jigsaw')[sourceIndex];
			if(jQuery(ele).find('.parallel').length > 1)
				jQuery(ele).find('.parallel[data-name='+actor+']').remove();
			else
				jQuery(ele).remove();
			delete this.storyScript[sourceIndex][actor];
		}
		this.addDialogue = function(mode){
			this.removeMode=false;
			dashboardInstance.addDialogue(mode);
			var that = this;
			setTimeout(function(){
				that.initiateSortable();	
			})
			
		}
		this.initiateSortable = function(){
			this.jigsawArray = jQuery(".jigsawContainer .jigsaw");
			jQuery(this.jigsawArray).sortable({
				connectWith: ".jigsaw",
				stop: function (ev, elem) {
					var actorName = elem.item[0].getAttribute("data-name");
					var sourceIndex = jQuery(ev.target).index()
					var destinationIndex = jQuery(elem.item[0].parentNode).index()
					if(dashboardInstance.storyScript[destinationIndex][actorName]){
						var ele = jQuery(elem.item[0]);
						ele.siblings('[data-name='+actorName+']').remove()
					}
					setTimeout(function(){
						dashboardInstance.storyScript[destinationIndex][actorName] = dashboardInstance.storyScript[sourceIndex][actorName];
						delete dashboardInstance.storyScript[sourceIndex][actorName];
						if(Object.keys(dashboardInstance.storyScript[sourceIndex]).length == 0 ){
							dashboardInstance.storyScript.splice(sourceIndex,1);
						}
					})

				}
			});
		}
	}

	ngAfterViewInit() {
		this.initiateSortable();
	}

}
