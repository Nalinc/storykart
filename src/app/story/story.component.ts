import {Component, AfterViewInit} from '@angular/core';
import { StoryService } from './story.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
	storyBackground: any = "";
	storyPlay: any;
	storyReset: any;
	storyPause: any;
	storyStepNext: any;
	storyStepPrev: any;
	timer: any;
	counter: any = 0;
	storyScript: any;
	storyActors: any;

	constructor(public storyService: StoryService, public route: ActivatedRoute,  public router: Router){
		this.storyMode = "paused";
		this.storyPlay = function(mode){
			if(mode == "play"){
				this.storyMode = mode;
			};
			if(this.storyMode == "paused" && mode != "stepNext" && mode != "stepPrev"){
				jQuery(".talk-bubble").remove();
				clearTimeout(this.timer);
				return true;
			}
			if(this.storyScript.length <= this.counter){
				this.storyReset();
				return true;
			}
			var eleArray = [];
			for(var actor of Object.keys(this.storyScript[this.counter])){
				var estimatedTime = 2000;
				var actorName = actor;
				var positionClass, positionFix = jQuery('.story-board [name="'+actorName+'"]').position();
				var dialogue = this.storyScript[this.counter][actorName];
				console.log(actorName)
				console.log(dialogue)

				//var actor = jQuery('.story-board [name="'+actorName+'"]');
				jQuery('.story-board [name="'+actorName+'"]').addClass("shake");
				//console.log(jQuery('.story-board [name="'+actorName+'"]'))
				if(dialogue.length > 30)
					estimatedTime = 4000;
				if(dialogue.length > 80)
					estimatedTime = 5000;
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
				/*<div class="talk-bubble tri-right border round left-in" id="speech"></div>*/
				var ele = jQuery("<div class='talk-bubble tri-right border round left-in'></div>")
				eleArray.push(ele);
				jQuery("#story-board").append(ele);
				ele.html(dialogue).css(positionFix)
								 .removeClass("btm-left-in left-in right-in")
								 .addClass(positionClass).show();

			}



			if(this.storyScript[this.counter]){
				if(mode !="stepNext" && mode !="stepPrev" && this.storyMode=='play'){
					var that = this;
					this.timer = setTimeout(function () {
						that.counter++;
						//jQuery('.story-board [name="'+actorName+'"]').removeClass("shake");
						jQuery('.story-board .actor').removeClass("shake");
						eleArray.forEach(function(ele){
							ele.remove();
						});
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
				jQuery(".talk-bubble").remove();
				jQuery("#story-board .actor").removeClass('shake');
				this.storyPlay("stepNext");
				this.counter++;
			}
		}
		this.storyStepPrev = function(){
			if(this.counter > 0){
				console.log("previous");
				jQuery(".talk-bubble").remove();
				jQuery("#story-board .actor").removeClass('shake');
				this.counter--;		
				this.storyPlay("stepPrev");
			}
		}
		this.storyReset = function(){
			this.counter = 0;
			jQuery(".talk-bubble").remove();
			jQuery("#story-board .actor").removeClass('shake');
			this.storyMode = "paused";
			clearTimeout(this.timer);
			jQuery("#speech").html("").hide();			
		}

	}

	ngAfterViewInit() {
	}
	ngOnInit(){
		this.route.params.forEach((params: Params) => {
	        if(params['id']){
	        	this.loadStory(params['id']);	
	        }
	    });
	}
	loadStory(storyid) {
		// Get all story
		this.storyService.getStory(storyid)
		.subscribe(
			response => {
				this.storyTitle = response['story'].title;
				this.storyAuthor = response['story'].author;
				this.storyAuthorEmail = response['story'].email;
				this.storyScript = response['story'].script;
				this.storyActors = response['story'].actors;
				this.storyBackground = response['story'].background;
				for(var actor in this.storyActors){
					var eleObj = jQuery( "<img />",{ 
									  "src":this.storyActors[actor].url,
									  "class": "actor",
									  "title": this.storyActors[actor].name,
									  "name": this.storyActors[actor].name })
					eleObj.css({
						"left":this.storyActors[actor].left,
						"top":this.storyActors[actor].top});
					jQuery('.story-board').append(eleObj);
				}

			}, //Bind to view
			err => {
				// Log errors if any
				console.log(err);
			}
		);
	}


}