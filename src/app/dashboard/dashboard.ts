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
	play: any;
	execute:any;
	timer: any;
	counter: any = 0;
	array:any;

	constructor(){
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
			jQuery('.story-box [name="'+data+'"]').remove();
			jQuery('.story-board, .story-actors').removeClass('highlight');
			jQuery('.add-more-actors').attr('src','/images/add.svg').css({"border":"1px dashed #a9a9a9"});			
			return;
		  }
		  else if(jQuery(ev.target).hasClass('actor'))
		  	return;

		  /* As we put the ID of the source element into this variable, we can now use 
		     this ID to manipulate the dragged element as we wish. */
		  /* Let's just move it through the DOM and append it here */
		  var ele = jQuery('.story-box [name="'+data+'"]');
		  ele.css({	"top": ev.offsetY - 35,"left":ev.offsetX - 35});
		  jQuery(ev.target).append(ele)
		};

		this.onReset = function(){
			jQuery('.story-board').html("");
			jQuery('.story-actors').html("");
			var avatars = ["boy_1","girl_1","man_1"]
			for(var i in avatars){
				var ele = jQuery("<img />",{
					"src":'sprites/'+avatars[i]+'.svg',
					"name":avatars[i]
				})
				jQuery('.story-actors').append(ele);
			}	
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
		this.array = [1,2,3,4,5,6,7];

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
									  "name":this.sprites.avatars[i].name })
					jQuery('.story-actors').append(eleActor);
				}
			}
			for(var i in this.sprites.objects){
				if(this.sprites.objects[i].selected){
					var eleObj = jQuery( "<img />",{ 
									  "src":'sprites/'+this.sprites.objects[i].name+'.svg', 
									  "name":this.sprites.objects[i].name })
					jQuery('.story-actors').append(eleObj);
				}
			}
			this.hideModal();
		}
		this.execute = function(mode){
			if(mode == "play"){
				var that = this; 
				this.timer = setTimeout(function () {
					if (that.array.length > that.counter){
						console.log(that.array[that.counter]);
						that.counter++;
					   that.execute('play');
					}
					else{
						that.play=false;
						that.counter = 0;
						clearTimeout(that.timer);
					}
				}, 1000);			
			}
			else if(mode == "pause"){
				console.log("trying to stioop")
				clearTimeout(this.timer);			
			}
			else if(mode == "prev" && this.counter > 0){
				this.counter--;
				console.log(this.array[this.counter-1]);
			}
			else if(mode == "next" && this.counter < this.array.length){
				console.log(this.array[this.counter]);
				this.counter++;
			}
			return true;
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
