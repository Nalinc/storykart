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
		this.addDialogue = function(){
			this.removeMode=false;
			dashboardInstance.addDialogue();
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
					console.log(actorName)
					console.log(sourceIndex)
					console.log(destinationIndex)
					if(dashboardInstance.storyScript[destinationIndex][actorName]){
						var ele = jQuery('.jigsawContainer .jigsaw')[destinationIndex];
						jQuery(ele).first('.parallel[data-name='+actorName+']').remove();
					}
					setTimeout(function(){
						dashboardInstance.storyScript[destinationIndex][actorName] = dashboardInstance.storyScript[sourceIndex][actorName];
						delete dashboardInstance.storyScript[sourceIndex][actorName];
					})
					if(Object.keys(dashboardInstance.storyScript[sourceIndex]).length == 0 ){
						dashboardInstance.storyScript.pop();
					}
					console.log(dashboardInstance.storyScript)

				}
			});
		}
	}

	ngAfterViewInit() {
		this.initiateSortable();
/*		jQuery(document).on('mouseup', ".jigsaw", function(ev){
			console.log(ev);
			console.log(ev.target);
			console.log(ev.target.parentNode);
			console.log(ev.target.parentNode.parentNode);
			console.log(ev.target.nextSibling);
			console.log(jQuery(ev.target).closest('.jigsaw'));
			console.log(jQuery(ev.target).closest('.jigsaw').index());
		});*/
	}

}
