import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHasError]'
})
export class HasErrorDirective {

  @Input('error') error: boolean;

  constructor(private elementRef: ElementRef) {}

  /**
   * Check if the element Input related, has an error after validations
   */
  checkIfHasError() {
    if (this.error) {
      this.elementRef.nativeElement.class = 'error';
    } else {
      this.elementRef.nativeElement.class = null;
    }
  }

  // #Listener definition for Focus and Blur events
  @HostListener('focus') checkErrorOnFocus() {
    this.checkIfHasError();
  }

  @HostListener('blur') checkErrorOnBlur() {
    this.checkIfHasError();
  }

}
