import { Component, OnInit } from '@angular/core';

import { Form } from '../../interface/form';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-nested-forms',
  templateUrl: './nested-forms.component.html',
  styleUrls: ['./nested-forms.component.css']
})
export class NestedFormsComponent implements OnInit {

  form: FormGroup;
  categories: string[] = [ 'Device info' , 'Metadata' ];

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.form = this.builder.group({
      categories: this.builder.array( [ ] )
    });
    const categories = (<FormArray>this.form.controls['categories']);
    for (let i = 0; i < this.categories.length; i++) {
      const categoryGroup = this.loadForm( this.categories[i] );
      categories.push(categoryGroup);
    }
  }

  loadForm( categoryName ) {
    const categoryGroup = this.builder.group({
      categoryName: [ categoryName ],
      items: this.builder.array( [ ] )
    });
    const formControls = this.addFormItem();
    const formItems = ( <FormArray>categoryGroup.controls.items );
    formItems.push( formControls );
    return ( categoryGroup );
  }

  addCategory() {
    const catName = ( 'New category ' + ( this.categories.length + 1 ) );
    this.categories.push( catName );
    const categories = ( <FormArray>this.form.controls['categories'] );
    const categoryGroup = this.loadForm( catName );
    categories.push( categoryGroup );
  }

  addFormItem() {
    const formTemplate = this.builder.group({
      name: ['', Validators.required],
      description: [''],
      deviceResource: [''],
      defaultValue: [''],
      dataType: [''],
      format: [''],
      enumerations: this.builder.array( [ ] )
    });
    return formTemplate;
  }

  addItem(category: FormArray) {
    const formItems = ( <FormArray>category );
    const formControls = this.addFormItem();
    formItems.push( formControls );
  }

  save() {
    console.log(this.form.value);
  }

}
