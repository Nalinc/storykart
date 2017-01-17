import {Component, Input, AfterViewInit, ChangeDetectionStrategy, ApplicationRef} from '@angular/core';
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

	constructor(public ref:ApplicationRef, public storyInstance: StoryService) {
		this.storyScript= storyInstance.storyScript;

		jQuery(document).on("click",".script-builder",(event) => {
			if(event.target.className!="scriptActor")
			jQuery(".multiple-select-wrapper .list").hide();
		});
		this.updateDialogue = function(ev,i,j){
			storyInstance.updateDialogue(i, j, ev.target.value);
		}
		this.deleteDialogue = function(i,j){
			storyInstance.deleteDialogue(i,j);
		}
		this.addDialogue = function(mode){
			storyInstance.addDialogue(mode);
			setTimeout(()=>{
				this.initiateSortable();
			})
		}
		this.initiateSortable = function(){
			this.jigsawArray = jQuery(".jigsawContainer .jigsaw");
			jQuery(this.jigsawArray).sortable({
				connectWith: ".jigsaw",
				stop: (ev, elem) => {
					var actorName = elem.item[0].getAttribute("data-name");
					var sourceIndex = jQuery(ev.target).index();
					var sourceRelativeIndex;
					var destinationIndex = jQuery(elem.item[0].parentNode).index()
					var destinationRelativeIndex = jQuery(elem.item[0]).index()
					var text = "";
					storyInstance.storyScript[sourceIndex].forEach(function(e,i){
						if(e.actor==actorName){
							sourceRelativeIndex = i;
						}
					});
					if(sourceIndex==destinationIndex){
						if(sourceRelativeIndex==destinationRelativeIndex) return;
						var tem = storyInstance.storyScript[sourceIndex][sourceRelativeIndex];
						storyInstance.storyScript[sourceIndex].splice(sourceRelativeIndex,1);
						storyInstance.storyScript[destinationRelativeIndex].splice(destinationRelativeIndex,0,tem);
					}else{
						var lastIndex,lastText;
						var temp = storyInstance.storyScript[sourceIndex][sourceRelativeIndex];
						storyInstance.storyScript[destinationIndex].forEach(function(e,i){
							if(e.actor == actorName){
								lastIndex = i;
								lastText = e.speech + "\n";
							}
						})
						if(!isNaN(lastIndex)){
							storyInstance.storyScript[destinationIndex].splice(lastIndex,1);
							storyInstance.storyScript[destinationIndex].splice(lastIndex,0,{"actor":actorName,"speech":lastText+temp.speech});
							var existingElem = jQuery('.jigsawContainer .jigsaw:nth-child('+(destinationIndex+1)+') .parallel:nth-child('+(lastIndex+1)+')');
							existingElem.find("textarea").val(lastText+temp.speech);
						}else{
							storyInstance.storyScript[destinationIndex].splice(destinationRelativeIndex,0,temp);
						}
						storyInstance.storyScript[sourceIndex].splice(sourceRelativeIndex,1);
						storyInstance.scriptTransitionIndex=destinationIndex;
						if(storyInstance.storyScript[sourceIndex].length==0){
							jQuery('.jigsawContainer .jigsaw:nth-child('+(sourceIndex+1)+')').remove()
							storyInstance.storyScript.splice(sourceIndex,1);
						}						
					}

					jQuery(elem.item[0]).remove();
					jQuery("#refreshView").trigger("click");
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
		this.changeActor = function(selectedActor,actorsList,i,j){
			var temp = storyInstance.storyScript[i][j];
			temp["actor"]=selectedActor;
			storyInstance.storyScript[i].splice(j,1);
			storyInstance.storyScript[i].splice(j,0,temp);
			jQuery(actorsList).toggle();
		}
		function move (arr, old_index, new_index) {
		    if (new_index >= arr.length) {
		        var k = new_index - arr.length;
		        while ((k--) + 1) {
		            arr.push(undefined);
		        }
		    }
		    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		    return arr; // for testing purposes
		};		
	}

	ngAfterViewInit() {
		this.initiateSortable();
	}

}
