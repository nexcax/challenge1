import { validate } from 'codelyzer/walkerFactory/walkerFn';
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
  categories: string[ ] = [ 'Device info' , 'Metadata' ];
  dataTypes: string[ ] = [ 'String', 'Object' ];
  formats: { } = {
    'String': [ 'None', 'Number', 'Boolean', 'Date-Time', 'CDATA', 'URI' ],
    'Object': [ ]
  };

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
      expanded: false,
      name: [ '' ],
      description: [ '' ],
      deviceResource: [ '' ],
      defaultValue: [ '' ],
      dataType: ['String'],
      format: [ '' ],
      enumerations: this.builder.array( [ ] )
    });
    formTemplate.controls['name'].setValidators( [
      Validators.required,
      this.notUnique.bind( this.form )
    ] );
    return formTemplate;
  }

  addItem(category: FormArray) {
    const formItems = ( <FormArray>category );
    const formControls = this.addFormItem();
    formItems.push( formControls );
  }

  addEnumeration ( enumeration: any ) {
    const currentEnumeration = <FormArray>enumeration;
    currentEnumeration.push( new FormControl('') );
  }

  removeEnumeration( enumeration: any, position: number ) {
    const currentEnumeration = <FormArray>enumeration;
    currentEnumeration.removeAt( position );
  }

  save() {
    console.log(this.form.value);
  }

  // Validations definitions
  notUnique( control: FormControl ): { [ s: string ]: boolean } {
    const form: any = this;
    for ( let i = 0; i < form.controls.categories.controls.length; i++ ) {
      const items = form.controls.categories.controls[i].controls.items.value;
      for ( let j = 0; j < items.length; j++ ) {
        if ( items[j].name === control.value ) {
          return {
            not_unique: true
          };
        }
      }
    }
    return null;
  }

  noEspacios( control: FormControl ): { [ s: string ]: boolean } {
    if( control.value.indexOf(' ') >= 0 ) {
      return {
        noespacios: true
      };
    }
    return null;
  }

}
