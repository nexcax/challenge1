import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nested-forms',
  templateUrl: './nested-forms.component.html'
})
export class NestedFormsComponent {

  categories: string[] = ['Device info', 'Metadata'];

  constructor() { }

}