import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nested-forms',
  templateUrl: './nested-forms.component.html'
})
export class NestedFormsComponent {

  form: FormGroup;
  categories: string[] = ['Device info', 'Metadata'];

  constructor() { }

}