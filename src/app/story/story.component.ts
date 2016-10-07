import {Component, AfterViewInit} from '@angular/core';
import { StoryService } from './story.service';
declare var jQuery: any;

@Component({
  selector: '[story]',
  host: {
    class: 'story-page'
  },  
  template: require('./story.html')
})
export class Story {

	storyTitle: string = ""; 
	storyAuthor:string = "Anonymous";
	storyAuthorEmail:string = "";
	storyJSON: any;
	storyMode: any;
	storyPlay: any;
	storyReset: any;
	storyPause: any;
	storyStepNext: any;
	storyStepPrev: any;
	timer: any;
	counter: any = 0;
	storyScript: any;

	constructor(public storyService: StoryService){
		this.storyMode = "paused";
		this.storyPlay = function(mode){
			if(mode == "play"){
				this.storyMode = mode;
			};
			if(this.storyMode == "paused" && mode != "stepNext" && mode != "stepPrev"){
				clearTimeout(this.timer);
				return true;
			}
			if(this.storyScript.length <= this.counter){
				this.storyReset();
				return true;
			}
			var estimatedTime = 1000;
			var actorName = this.storyScript[this.counter].substring(0, this.storyScript[this.counter].indexOf(":"))
			var positionClass, positionFix = jQuery('.story-board [name="'+actorName+'"]').position();
			var dialogue = this.storyScript[this.counter].substring(this.storyScript[this.counter].indexOf(":")+1,this.storyScript[this.counter].length);

			//var actor = jQuery('.story-board [name="'+actorName+'"]');
			jQuery('.story-board [name="'+actorName+'"]').addClass("shake");
			//console.log(jQuery('.story-board [name="'+actorName+'"]'))
			if(dialogue.length > 30)
				estimatedTime = 1500;
			if(dialogue.length > 80)
				estimatedTime = 2000;
			// quadrant 1
			if(positionFix.top < 200 && positionFix.left > 300){
				//positionFix.top = positionFix.top;
				positionFix.left -= 200;
				positionClass = "right-in";
			}
			// quadrant 2
			else if(positionFix.top < 200 && positionFix.left < 300){
				//positionFix.top = positionFix.top;
				positionFix.left += 80;
				positionClass = "left-in";
			}
			// quadrant 3
			else if(positionFix.top > 200 && positionFix.left < 300){
				//positionFix.top -= 100;
				positionFix.left += 80;
				positionClass = "left-in";
			}
			// quadrant 4
			else if(positionFix.top > 200 && positionFix.left > 300){
				//positionFix.top = positionFix.top;
				positionFix.left -= 200;
				positionClass = "right-in";
			}

			//jQuery('.story-board [name="'+actorName+'"]').removeClass("shake");

			jQuery("#speech").html(dialogue).css(positionFix)
							 .removeClass("btm-left-in left-in right-in")
							 .addClass(positionClass).show();
			if(this.storyScript[this.counter]){
				if(mode !="stepNext" && mode !="stepPrev" && this.storyMode=='play'){
					var that = this;
					this.timer = setTimeout(function () {
						that.counter++;
						jQuery('.story-board [name="'+actorName+'"]').removeClass("shake");
					    that.storyPlay();
					},estimatedTime)				
				}
			}
			else{
				this.storyReset();
			}
			return true;
		}
		this.storyStepNext = function(){
			if(this.counter < this.storyScript.length){
				console.log("next")
				this.storyPlay("stepNext");
				this.counter++;
			}
		}
		this.storyStepPrev = function(){
			if(this.counter > 0){
				console.log("previous");
				this.counter--;		
				this.storyPlay("stepPrev");
			}
		}
		this.storyReset = function(){
			this.counter = 0;
			this.storyMode = "paused";
			clearTimeout(this.timer);
			jQuery("#speech").html("").hide();			
		}

	}

	ngAfterViewInit() {
	}
	ngOnInit(){
		this.loadStory();
	}
	loadStory() {
		// Get all story
		this.storyService.getStory()
		.subscribe(
			story => {console.log(story)}, //Bind to view
			err => {
				// Log errors if any
				console.log(err);
			}
		);
	}


}