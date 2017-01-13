import {Component, Input, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import { StoryService } from '../story/story.service';
require('jquery-ui/sortable');
declare var jQuery: any;

@Component({
    selector: 'script-builder',
    template: require('./scriptbuilder.html'),
  	changeDetection: ChangeDetectionStrategy.OnPush,
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

	constructor(private storyInstance: StoryService) {
		this.storyScript= storyInstance.storyScript;
		this.updateDialogue = function(ev, actor){
			var sourceIndex = jQuery(ev.target.parentNode.parentNode.parentNode).index();
			storyInstance.updateDialogue(sourceIndex, actor, ev.target.value);
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
			storyInstance.addDialogue(mode);
			var that = this;
			if(mode=="horizontal"){
				//elem.item[0].lastElementChild.lastElementChild.textContent = storyInstance.storyScript[destinationIndex][actorName];
			}
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
					var text = "";

					if(sourceIndex==destinationIndex) return;
					if(storyInstance.storyScript[destinationIndex][actorName]){
						var ele = jQuery(elem.item[0]);
						var siblings = ele.siblings('[data-name='+actorName+']')
						jQuery.each(siblings,function(i){
							text += siblings[i].lastElementChild.textContent.trim()+"\n";
						})
						siblings.remove();
						
					}
					storyInstance.storyScript[destinationIndex][actorName] = text + storyInstance.storyScript[sourceIndex][actorName];
					elem.item[0].lastElementChild.lastElementChild.textContent = storyInstance.storyScript[destinationIndex][actorName];
					delete storyInstance.storyScript[sourceIndex][actorName];
					if(Object.keys(storyInstance.storyScript[sourceIndex]).length == 0 ){
						jQuery('.jigsawContainer .jigsaw').last().remove()
						storyInstance.storyScript.splice(sourceIndex,1);
					}
				}
			});
		}
	}

	ngAfterViewInit() {
		this.initiateSortable();
	}

}
