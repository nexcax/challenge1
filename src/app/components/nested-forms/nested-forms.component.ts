import { ReturnStatement } from '@angular/compiler/src/output/output_ast';
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
      format: [ 'None' ],
      rangeMin: [ 0 ],
      rangeMax: [ 0 ],
      measureUnit: [ '' ],
      precision: [ 0 ],
      accuracy: [ 0 ],
      enumerations: this.builder.array( [ ] )
    });
    formTemplate.controls['name'].setValidators( [
      Validators.required,
      this.notUnique.bind( this.form )
    ]);
    formTemplate.controls['rangeMin'].setValidators( [
      this.rangeValid.bind( formTemplate )
    ] );
    formTemplate.controls['rangeMax'].setValidators( [
      this.rangeValid.bind( formTemplate )
    ] );
    formTemplate.controls['precision'].setValidators( [
      this.validPrecision.bind( formTemplate )
    ] );
    formTemplate.controls['accuracy'].setValidators( [
      this.validAccuracy.bind( formTemplate )
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
    currentEnumeration.push( new FormControl( '', [ Validators.required ] ) );
  }

  removeEnumeration( enumeration: any, position: number ) {
    const currentEnumeration = <FormArray>enumeration;
    currentEnumeration.removeAt( position );
  }

  refreshDataView( ) {
    console.log( this.form.value );
  }

  viewFormStatus() {
    console.log(this.form);
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

  validPrecision( control: FormControl ): { [ s: string ]: boolean } {
    const item: any = this;
    if ( item.controls['format'].value === 'Number' ) {
      if ( item.controls.precision.value.length <= 0 ) {
        return {
          precision_value_required: true
        };
      }
      if ( item.controls.rangeMin.value.length <= 0 ) {
        return {
          min_value_required_for_precision: true
        };
      }
      if ( item.controls.rangeMax.value.length <= 0 ) {
        return {
          max_value_required_for_precision: true
        };
      }
      if ( Number(item.controls.precision.value) < Number(item.controls.rangeMin.value) ||
           Number(item.controls.precision.value) > Number(item.controls.rangeMax.value) ) {
        return {
          precision_range_offset: true
        };
      }
      const diff = Number(item.controls.rangeMax.value) - Number(item.controls.rangeMin.value);
      if ( ( diff % Number(item.controls.precision.value) ) !== 0 ) {
        return {
          no_valid_precision: true
        };
      }
    }
    return null;
  }

  rangeValid( control: FormControl ): { [ s: string ]: boolean } {
    const item: any = this;
    setTimeout( () => {
      item.controls.precision.updateValueAndValidity();
      item.controls.accuracy.updateValueAndValidity();
    }, 20 );
    if ( item.controls['format'].value === 'Number' ) {
      if ( item.controls.rangeMin.value.length <= 0 ) {
        return {
          min_value_required: true
        };
      }
      if ( item.controls.rangeMax.value.length <= 0 ) {
        return {
          max_value_required: true
        };
      }
      if ( isNaN( Number(item.controls.rangeMin.value) ) || isNaN( Number(item.controls.rangeMax.value) ) ) {
        return {
          range_invalid: true
        };
      }
      if ( Number(item.controls.rangeMin.value) >= Number(item.controls.rangeMax.value) ) {
        return {
          range_invalid: true
        };
      }
    }
    if ( item.controls.rangeMin.valid !== item.controls.rangeMax.valid ) {
      if ( item.controls.rangeMin.valid === false ) {
        item.controls.rangeMin.updateValueAndValidity();
      } else if( item.controls.rangeMax.valid === false ) {
        item.controls.rangeMax.updateValueAndValidity();
      }
    }
    return null;
  }

  validAccuracy( control: FormControl ): { [ s: string ]: boolean } {
    const item: any = this;
    if ( item.controls['format'].value === 'Number' ) {
      if ( item.controls.accuracy.value.length <= 0 ) {
        return {
          accuracy_value_required: true
        };
      }
      if ( item.controls.rangeMin.value.length <= 0 ) {
        return {
          min_value_required_for_accuracy: true
        };
      }
      if ( item.controls.rangeMax.value.length <= 0 ) {
        return {
          max_value_required_for_accuracy: true
        };
      }
      if ( Number(item.controls.accuracy.value) < Number(item.controls.rangeMin.value) ||
           Number(item.controls.accuracy.value) > Number(item.controls.rangeMax.value) ) {
        return {
          accuracy_range_offset: true
        };
      }
    }
    return null;
  }

}
