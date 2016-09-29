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
      let el = this._elementRef.nativeElement;
      
      // Set the draggable attribute to the element
      el.draggable = 'true';
      /*console.log("start")*/
      // Set up the dragstart event and add the drag-src CSS class 
      // to change the visual appearance. Set the current todo as the data
      // payload by stringifying the object first
      el.addEventListener('dragstart', (e) => {
      jQuery('.story-actors, .story-board').addClass('highlight');
      jQuery('.add-more-actors').attr('src','/images/dustbin.svg').css({"border":"none"});
      el.classList.add('drag-src')
      e.dataTransfer.effectAllowed = 'move';
      /*console.log(e.target.name);*/
      e.dataTransfer.setData('text', e.target.name);
    });
    
    // Remove the drag-src class
    el.addEventListener('dragend', (e) => {
      e.preventDefault();
      jQuery('.story-board, .story-actors').removeClass('highlight');
      jQuery('.add-more-actors').attr('src','/images/add.svg').css({"border":"1px dashed #a9a9a9"});
      el.classList.remove('drag-src')
    });
  }
}