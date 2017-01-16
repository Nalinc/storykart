import {Component, Input, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import { StoryService } from '../story/story.service';
//require('jquery-ui/sortable');
import {DragulaService} from 'ng2-dragula/ng2-dragula';
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
		this.updateDialogue = function(ev,i,j){
			storyInstance.updateDialogue(i, j, ev.target.value);
		}
		this.deleteDialogue = function(i,j){
			storyInstance.deleteDialogue(i,j);
		}
		this.addDialogue = function(mode){
			storyInstance.addDialogue(mode);
			/*setTimeout(()=>{
				this.initiateSortable();
			})*/
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
					if(sourceIndex==destinationIndex) return;
					storyInstance.storyScript[sourceIndex].forEach(function(e,i){
						if(e.actor==actorName){
							sourceRelativeIndex = i;
						}
					});
					console.log("initiateSortable= "+sourceIndex+", "+sourceRelativeIndex+", "+destinationIndex+", "+destinationRelativeIndex)
					var lastIndex,lastText;
					var temp = storyInstance.storyScript[sourceIndex][sourceRelativeIndex];
					console.log(temp)
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
						console.log(existingElem)
						existingElem.find("textarea").val(lastText+temp.speech);
						jQuery(elem.item[0]).remove();
					}else{
						storyInstance.storyScript[destinationIndex].splice(destinationRelativeIndex,0,temp);
					}
					storyInstance.storyScript[sourceIndex].splice(sourceRelativeIndex,1);
					storyInstance.scriptTransitionIndex=destinationIndex;
					storyInstance.scriptTransitionRelativeIndex=destinationRelativeIndex;
					if(storyInstance.storyScript[sourceIndex].length==0){
						jQuery('.jigsawContainer .jigsaw:nth-child('+(sourceIndex+1)+')').remove()
						storyInstance.storyScript.splice(sourceIndex,1);
					}
					console.log(storyInstance.storyScript)
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
			console.log("changeActor="+i+", "+j)
			var temp = storyInstance.storyScript[i][j];
			temp["actor"]=selectedActor;
			storyInstance.storyScript[i].splice(j,1);
			storyInstance.storyScript[i].splice(j,0,temp);
/*			var index = jQuery(jigsaw).index()
			var text = storyInstance.storyScript[index][jQuery(currentActor).attr("title")];
			console.log(jQuery(currentActor).attr("title"))
			delete storyInstance.storyScript[index][jQuery(currentActor).attr("title")];
			storyInstance.storyScript.splice(index, 0, {selectedActor:text})
			jQuery(currentActor).attr("title",selectedActor)
			jQuery(currentActor).attr("src","http://storykart.herokuapp.com/sprites/"+selectedActor+".svg")
			jQuery(parallel).attr("data-name",selectedActor)*/
			jQuery(actorsList).toggle();
		}
	}

	ngAfterViewInit() {
//		this.initiateSortable();
	}

}
