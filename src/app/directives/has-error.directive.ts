import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHasError]'
})
export class HasErrorDirective {

  @Input('error') error: boolean;

  constructor(private elementRef: ElementRef) {}

  checkIfHasError() {
    if (this.error) {
      this.elementRef.nativeElement.class = 'error';
    } else {
      this.elementRef.nativeElement.class = null;
    }
  }

  @HostListener('focus') checkErrorOnFocus() {
    this.checkIfHasError();
  }

  @HostListener('blur') checkErrorOnBlur() {
    this.checkIfHasError();
  }

}
