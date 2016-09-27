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
			jQuery('[name="'+data+'"]').remove();
			jQuery('.story-board, .story-actors').removeClass('highlight');
			jQuery('.add-more-actors').attr('src','/images/add.svg').css({"border":"1px dashed #a9a9a9"});			
			return;
		  }
		  else if(jQuery(ev.target).hasClass('actor'))
		  	return;

		  /* As we put the ID of the source element into this variable, we can now use 
		     this ID to manipulate the dragged element as we wish. */
		  /* Let's just move it through the DOM and append it here */
		  var ele = jQuery('[name="'+data+'"]');
		  ele.css({	"top": ev.offsetY,"left":ev.offsetX })
		  jQuery(ev.target).append(ele)
		};

		this.onReset = function(){
			jQuery('.story-board').html("");
			jQuery('.story-actors').html("");
			var avatars = ["boy-1","girl-12","man-2"]
			for(var i in avatars){
				var ele = jQuery("<img />",{
					"src":'avatars/'+avatars[i]+'.svg',
					"name":avatars[i]
				})
				jQuery('.story-actors').append(ele);
			}	
		}

		this.showModal = function(){
			jQuery("#myModal").css({"display":"block"})
		}
		this.hideModal = function(){
			jQuery("#myModal").css({"display":"none"})
		}
	}
	ngAfterViewInit() {
		jQuery("textarea").attr('placeholder', 'actor_1_name: ' + 'Hi' + '\n' + 'actor_2_name: ' + 'Hello');
	}



}
