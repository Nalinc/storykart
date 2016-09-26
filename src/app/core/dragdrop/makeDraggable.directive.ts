import { Directive, ElementRef, Input, OnInit } from '@angular/core';
declare var jQuery: any;


@Directive({
  selector: '[makeDraggable]'
})
export class MakeDraggable {
  @Input('makeDraggable') data: any;
  
  constructor(private _elementRef: ElementRef) {}
  
  ngOnInit() {
    // Get the current element
    let el = this._elementRef.nativeElement.querySelector('.actor');
    
    // Set the draggable attribute to the element
    el.draggable = 'true';
    
    // Set up the dragstart event and add the drag-src CSS class 
    // to change the visual appearance. Set the current todo as the data
    // payload by stringifying the object first
    el.addEventListener('dragstart', (e) => {
      console.log('Start');
//      jQuery('.story-board').css({'background-color':'yellow'})      
      el.classList.add('drag-src')
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text', JSON.stringify(this.data));
    });
    
    // Remove the drag-src class
    el.addEventListener('dragend', (e) => {
      e.preventDefault();
//      jQuery('.story-board').css({'background-color':'inherit'})
      el.classList.remove('drag-src')
    });
  }
}