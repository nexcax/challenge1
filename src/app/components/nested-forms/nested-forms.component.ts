import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatiorsService } from '../../services/validatiors.service';

@Component({
  selector: 'app-nested-forms',
  templateUrl: './nested-forms.component.html',
  styleUrls: ['./nested-forms.component.css']
})
export class NestedFormsComponent implements OnInit {

  form: FormGroup;
  categories: string[] = ['Device info', 'Metadata'];

  constructor(private validator: ValidatiorsService) { }

  ngOnInit() {}

  /*addCategory() {
    const catName = ('New category ' + (this.categories.length + 1));
    this.categories.push(catName);
    const categories = (<FormArray>this.form.controls['categories']);
    //const categoryGroup = this.loadForm(catName);
    //categories.push(categoryGroup);
  }*/

}
