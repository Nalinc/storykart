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

	constructor(){

		this.onDrop = function (ev) {
		  /* The default handling is not to process a drop action and hand it to the next 
		     higher html element in your DOM. */
		  /* Here, we prevent the default behaviour in order to process the event within 
		     this handler and to stop further propagation of the event. */
		  ev.preventDefault();
		  /* In the drag event, we set the *variable* (it is not a variable name but a 
		     format, please check the reference!) "text/html", now we read it out */
		  var data=ev.dataTransfer.getData("text/html");
		  /* As we put the ID of the source element into this variable, we can now use 
		     this ID to manipulate the dragged element as we wish. */
		  /* Let's just move it through the DOM and append it here */
		  console.log("drop")
		  console.log(ev.target)
		  console.log(ev.target.appendChild)
		  console.log(jQuery(ev.target))
		  jQuery(ev.target).append(data.replace('makedraggable=""',''))
		};
	}
	ngAfterViewInit() {
		jQuery("textarea").attr('placeholder', 'actor_1_name: ' + 'Hi' + '\n' + 'actor_2_name: ' + 'Hello');
	}



}
