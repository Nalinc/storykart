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
	toggleList: any;
	availableActors:any;
	changeActor: any;

	constructor(private storyInstance: StoryService) {
		this.storyScript= storyInstance.storyScript;

		jQuery(document).on("click",".script-builder",(event) => {
			if(event.target.className!="scriptActor")
			jQuery(".multiple-select-wrapper .list").hide();
		});
		this.updateDialogue = function(ev, actor){
			var sourceIndex = jQuery(ev.target.parentNode.parentNode.parentNode).index();
			storyInstance.updateDialogue(sourceIndex, actor, ev.target.value);
		}
		this.deleteDialogue = function(event, actor){
			var sourceIndex = jQuery(event.target.parentNode.parentNode.parentNode).index();
			var ele = jQuery('.jigsawContainer .jigsaw')[sourceIndex];
			if(jQuery(ele).find('.parallel').length > 1){

				jQuery(ele).find('.parallel[data-name='+actor+']').remove();
				delete this.storyScript[sourceIndex][actor];
			}
			else{
				jQuery(ele).remove();
				this.storyScript.splice(sourceIndex,1);
			}
			
		}
		this.addDialogue = function(mode){
			this.removeMode=false;
			storyInstance.addDialogue(mode);
			var that = this;
			if(mode=="horizontal"){
				//elem.item[0].lastElementChild.lastElementChild.textContent = storyInstance.storyScript[destinationIndex][actorName];
				var ele = jQuery(".jigsawContainer .jigsaw").last().find(".parallel[data-name=boy_1]")
				if(ele.length){
					ele.find(".scriptText").val(this.storyScript[this.storyScript.length-1]["boy_1"]);
				}else{
					var newJigsaw = jQuery(".jigsawContainer .jigsaw").last().find(".parallel").clone();
					newJigsaw.attr("data-name","boy_1");
					newJigsaw.find(".scriptActor").attr("src","http://storykart.herokuapp.com/sprites/boy_1.svg");
					newJigsaw.find(".scriptActor").attr("title","boy_1");
					newJigsaw.find(".scriptText").val("Hi");
					jQuery(".jigsawContainer .jigsaw").last().append(newJigsaw);
				}
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
						text = storyInstance.storyScript[destinationIndex][actorName]+"\n";
						var siblings = jQuery(elem.item[0]).siblings('[data-name='+actorName+']')
						siblings[0].lastElementChild.lastElementChild.textContent= text + storyInstance.storyScript[sourceIndex][actorName]
						jQuery(elem.item[0]).remove();
					}
					storyInstance.storyScript[destinationIndex][actorName] = text + storyInstance.storyScript[sourceIndex][actorName];
					delete storyInstance.storyScript[sourceIndex][actorName];
					if(Object.keys(storyInstance.storyScript[sourceIndex]).length == 0 ){
						jQuery('.jigsawContainer .jigsaw:nth-child('+(sourceIndex+1)+')').remove()
						storyInstance.storyScript.splice(sourceIndex,1);
					}
				}
			});
		}
		this.toggleList = function(actorsList,jigsaw){
			var actorsOnBoard =		Array.from(
										jQuery('.story-board img')
											.map(function(a,o){return o.attributes.name.value})
									)
			var existingActors =	new Set(
										Array.from(
											jQuery(jigsaw).find('.parallel')
												.map(function(a,o){return o.attributes['data-name'].value})
										)
									);
			this.availableActors = [...actorsOnBoard].filter((x) => {return !existingActors.has(x)});
			if(this.availableActors.length>0)
				jQuery(actorsList).toggle();
		}
		this.changeActor = function(selectedActor,currentActor,actorsList,jigsaw,parallel){
			var index = jQuery(jigsaw).index()
			this.storyScript[index][selectedActor] = this.storyScript[index][jQuery(currentActor).attr("title")]
			delete this.storyScript[index][jQuery(currentActor).attr("title")];
			jQuery(currentActor).attr("title",selectedActor)
			jQuery(currentActor).attr("src","http://storykart.herokuapp.com/sprites/"+selectedActor+".svg")
			jQuery(parallel).attr("data-name",selectedActor)
			jQuery(actorsList).toggle();
		}
	}

	ngAfterViewInit() {
		this.initiateSortable();
	}

}
