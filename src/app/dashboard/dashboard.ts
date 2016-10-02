import {Component, AfterViewInit} from '@angular/core';
declare var jQuery: any;

@Component({
  selector: '[dashboard]',
  host: {
    class: 'dashboard-page'
  },
  template: require('./dashboard.html')
})

export class Dashboard  implements AfterViewInit{
	todo: string = "NALIN"; 
	onDrop: any;
	onReset: any;
	showModal: any;
	hideModal: any;
	importAvatars: any;
	active: any = 'avatars';
	sprites: any;
	storyMode: any;
	storyPlay: any;
	storyReset: any;
	storyPause: any;
	storyStepNext: any;
	storyStepPrev: any;
	timer: any;
	counter: any = 0;
	storyScript: any;
	compileScript: any;
	initScript: any;

	constructor(){

		this.storyMode = "paused";
		
		this.initScript = "boy_1: Hi, I am the first actor in your story\nboy_1: You can select other actors from panal aside..\nboy_1: and create your own script\nboy_1: Hover over the actor/object to know it's name";
		this.storyScript = this.initScript.split('\n');

		this.onDrop = function (ev) {
		  /* The default handling is not to process a drop action and hand it to the next 
		     higher html element in your DOM. */
		  /* Here, we prevent the default behaviour in order to process the event within 
		     this handler and to stop further propagation of the event. */
		  ev.preventDefault();
		  /* In the drag event, we set the *variable* (it is not a variable name but a 
		     format, please check the reference!) "text/html", now we read it out */
		  var data=ev.dataTransfer.getData("text");

		  if (ev.target == jQuery(".add-more-actors")[0]){
			jQuery('.story-box #'+data).remove();
			jQuery('.story-board, .story-actors').removeClass('highlight');
			jQuery('.add-more-actors').attr('src','/images/add.svg').css({"border":"1px dashed #a9a9a9"});			
			return;
		  }
		  else if(jQuery(ev.target).hasClass('actor'))
		  	return;

		  /* As we put the ID of the source element into this variable, we can now use 
		     this ID to manipulate the dragged element as we wish. */
		  /* Let's just move it through the DOM and append it here */
		  var ele = jQuery('.story-box #'+data);
		  ele.css({	"top": ev.offsetY - 35,"left":ev.offsetX - 35});
		  jQuery(ev.target).append(ele)
		};

		this.onReset = function(){
			jQuery('.story-board .actor').remove();
			jQuery('.story-actors .actor').remove();
			var avatars = ["boy_1","girl_1","man_1"]
			for(var i in avatars){
				var ele = jQuery("<img />",{
					"src":'sprites/'+avatars[i]+'.svg',
					"name":avatars[i],
					"class":"actor",
					"id": new Date().getTime()
				})
				jQuery('.story-actors').append(ele);
			}
			jQuery("#speech").html("").hide();
		}

		this.sprites = {
			avatars: [
				{"name":"boy_1", "selected":""},
				{"name":"boy_2", "selected":""},
				{"name":"boy_3", "selected":""},
				{"name":"boy_4", "selected":""},
				{"name":"boy_5", "selected":""},
				{"name":"man_1", "selected":""},
				{"name":"man_2", "selected":""},
				{"name":"girl_1", "selected":""},
				{"name":"girl_2", "selected":""},
				{"name":"girl_3", "selected":""},
				{"name":"girl_4", "selected":""},
				{"name":"girl_5", "selected":""},
				{"name":"woman_1", "selected":""},
				{"name":"woman_2", "selected":""}
			],
			objects:[
				{"name":"dog", "selected":""},
				{"name":"tree_1", "selected":""},
				{"name":"sun", "selected":""}
			]
		};

		this.showModal = function(){
			this.sprites = {
				avatars: [
					{"name":"boy_1", "selected":""},
					{"name":"boy_2", "selected":""},
					{"name":"boy_3", "selected":""},
					{"name":"boy_4", "selected":""},
					{"name":"boy_5", "selected":""},
					{"name":"man_1", "selected":""},
					{"name":"man_2", "selected":""},
					{"name":"girl_1", "selected":""},
					{"name":"girl_2", "selected":""},
					{"name":"girl_3", "selected":""},
					{"name":"girl_4", "selected":""},
					{"name":"girl_5", "selected":""},
					{"name":"woman_1", "selected":""},
					{"name":"woman_2", "selected":""}
				],
				objects:[
					{"name":"dog", "selected":""},
					{"name":"tree_1", "selected":""},
					{"name":"sun", "selected":""}
				]
			}
			jQuery("#myModal").css({"display":"block"})
		}
		this.hideModal = function(){
			jQuery("#myModal").css({"display":"none"})
		}
		this.importAvatars = function(){
			for(var i in this.sprites.avatars){
				if(this.sprites.avatars[i].selected){
					var eleActor = jQuery( "<img />",{ 
									  "src":'sprites/'+this.sprites.avatars[i].name+'.svg',
									  "id": new Date().getTime(),
									  "name":this.sprites.avatars[i].name })
					jQuery('.story-actors').append(eleActor);
				}
			}
			for(var i in this.sprites.objects){
				if(this.sprites.objects[i].selected){
					var eleObj = jQuery( "<img />",{ 
									  "src":'sprites/'+this.sprites.objects[i].name+'.svg',
									  "id": new Date().getTime(),
									  "name":this.sprites.objects[i].name })
					jQuery('.story-actors').append(eleObj);
				}
			}
			this.hideModal();
		}

		this.compileScript = function(val){
			console.log(val.split('\n'));
			this.storyScript = val.split('\n');
			return this.storyScript;
		}

		this.storyPlay = function(mode){
			console.log(this.storyScript)
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
			var dialogue = this.storyScript[this.counter].substring(this.storyScript[this.counter].indexOf(":")+1,this.storyScript[this.counter].length)
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

			jQuery("#speech").html(dialogue).css(positionFix)
							 .removeClass("btm-left-in left-in right-in")
							 .addClass(positionClass).show();
			if(this.storyScript[this.counter]){
				if(mode !="stepNext" && mode !="stepPrev" && this.storyMode=='play'){
					var that = this;
					this.timer = setTimeout(function () {
						that.counter++;
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

		window.onresize = function(){
			jQuery('.story-controller').css({'margin-left':jQuery('.story-board').position().left});		
		}
	}
	ngAfterViewInit() {
		jQuery("textarea").attr('placeholder', 'actor_1_name: ' + 'Hi' + '\n' + 'actor_2_name: ' + 'Hello');
		jQuery('.story-controller').css({'margin-left':jQuery('.story-board').position().left});
	}



}
