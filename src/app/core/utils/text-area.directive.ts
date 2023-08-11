// angular

import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

// app

@Directive({
  selector: 'p[scrollable]'
})

export class TextareaScrollDirective {

  @Output() scrolled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('scroll', ['$event']) onScroll(event: any) {
    // visible height + pixel scrolled = total height
    console.log('je scroll');
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.scrolled.emit(true);
      console.log('je suis au bout');
    }
  }
  constructor() {
    console.log('je suis chargé');
  }

}