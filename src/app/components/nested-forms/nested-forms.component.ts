import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nested-forms',
  templateUrl: './nested-forms.component.html',
  styleUrls: ['./nested-forms.component.css']
})
export class NestedFormsComponent implements OnInit {

  form: FormGroup;
  categories: string[] = ['Device info', 'Metadata'];
  dataTypes: string[] = ['String', 'Object'];
  formats: {} = {
    'String': ['None', 'Number', 'Boolean', 'Date-Time', 'CDATA', 'URI'],
    'Object': []
  };

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.form = this.builder.group({
      categories: this.builder.array([])
    });
    const categories = (<FormArray>this.form.controls['categories']);
    for (let i = 0; i < this.categories.length; i++) {
      const categoryGroup = this.loadForm(this.categories[i]);
      categories.push(categoryGroup);
    }
  }

  loadForm(categoryName) {
    const categoryGroup = this.builder.group({
      categoryName: [categoryName],
      items: this.builder.array([])
    });
    const formControls = this.addFormItem();
    const formItems = (<FormArray>categoryGroup.controls.items);
    formItems.push(formControls);
    return categoryGroup;
  }

  addCategory() {
    const catName = ('New category ' + (this.categories.length + 1));
    this.categories.push(catName);
    const categories = (<FormArray>this.form.controls['categories']);
    const categoryGroup = this.loadForm(catName);
    categories.push(categoryGroup);
  }

  addFormItem() {
    const formTemplate = this.builder.group({
      expanded: false,
      name: [],
      description: [],
      deviceResource: [],
      defaultValue: [],
      dataType: [],
      format: [],
      rangeMin: [],
      rangeMax: [],
      measureUnit: [],
      precision2: [],
      accuracy: [],
      enumerations: this.builder.array([])
    });
    formTemplate.controls['name'].setValidators([
      Validators.required,
      this.notUnique.bind(this.form)
    ]);
    formTemplate.controls['rangeMin'].setValidators([
      this.rangeValid.bind(formTemplate)
    ]);
    formTemplate.controls['rangeMax'].setValidators([
      this.rangeValid.bind(formTemplate)
    ]);
    formTemplate.controls['precision2'].setValidators([
      this.validPrecision2.bind(formTemplate)
    ]);
    formTemplate.controls['accuracy'].setValidators([
      this.validAccuracy.bind(formTemplate)
    ]);
    return formTemplate;
  }

  addItem(category: FormArray) {
    const formItems = (<FormArray>category);
    const formControls = this.addFormItem();
    formItems.push(formControls);
    this.form.reset(this.form.value);
  }

  deleteAttribute(attribute: any, position: number) {
    const currentAttribute = <FormArray>attribute;
    currentAttribute.removeAt(position);
    this.form.reset(this.form.value);
  }

  addEnumeration(enumeration: any) {
    const currentEnumeration = <FormArray>enumeration;
    currentEnumeration.push(new FormControl(null, [Validators.required]));
  }

  removeEnumeration(enumeration: any, position: number) {
    const currentEnumeration = <FormArray>enumeration;
    currentEnumeration.removeAt(position);
  }

  refreshDataView() {
    console.log(this.form.value);
  }

  viewFormStatus() {
    console.log(this.form);
  }

  save() {
    console.log(this.form.value);
  }

  // Validations definitions
  notUnique(control: FormControl): { [s: string]: boolean } {
    const form: any = this;
    if (!control.pristine) {
      for (let i = 0; i < form.controls.categories.controls.length; i++) {
        const items = form.controls.categories.controls[i].controls.items.value;
        for (let j = 0; j < items.length; j++) {
          if (items[j].name === control.value) {
            return {
              not_unique: true
            };
          }
        }
      }
    }
    return null;
  }

  validPrecision2(control: FormControl): { [s: string]: boolean } {
    const item: any = this;
    if (item.controls['format'].value === 'Number') {
      if (item.controls.precision2.value && item.controls.precision2.value.length <= 0) {
        return {
          precision2_value_required: true
        };
      }
      if (item.controls.rangeMin.value !== null && item.controls.rangeMin.value.length <= 0) {
        return {
          min_value_required_for_precision2: true
        };
      }
      if (item.controls.rangeMax.value !== null && item.controls.rangeMax.value.length <= 0) {
        return {
          max_value_required_for_precision2: true
        };
      }
      if (Number(item.controls.precision2.value) < Number(item.controls.rangeMin.value) ||
        Number(item.controls.precision2.value) > Number(item.controls.rangeMax.value)) {
        return {
          precision2_range_offset: true
        };
      }
      const diff = Number(item.controls.rangeMax.value) - Number(item.controls.rangeMin.value);
      if ((diff % Number(item.controls.precision2.value)) !== 0) {
        return {
          precision2_not_valid: true
        };
      }
    }
    return null;
  }

  rangeValid(control: FormControl): { [s: string]: boolean } {
    const item: any = this;
    setTimeout(() => {
      item.controls.accuracy.updateValueAndValidity();
      item.controls.precision2.updateValueAndValidity();
    }, 20);
    if (item.controls['format'].value === 'Number') {
      if (item.controls.rangeMin.value !== null && item.controls.rangeMin.value.length <= 0) {
        return {
          min_value_required: true
        };
      }
      if (item.controls.rangeMax.value !== null && item.controls.rangeMax.value.length <= 0) {
        return {
          max_value_required: true
        };
      }
      if (isNaN(Number(item.controls.rangeMin.value)) || isNaN(Number(item.controls.rangeMax.value))) {
        return {
          range_invalid: true
        };
      }
      if (Number(item.controls.rangeMin.value) >= Number(item.controls.rangeMax.value)) {
        return {
          range_invalid: true
        };
      }
    }
    if (item.controls.rangeMin.valid !== item.controls.rangeMax.valid) {
      if (item.controls.rangeMin.valid === false) {
        item.controls.rangeMin.updateValueAndValidity();
      } else if (item.controls.rangeMax.valid === false) {
        item.controls.rangeMax.updateValueAndValidity();
      }
    }
    return null;
  }

  validAccuracy(control: FormControl): { [s: string]: boolean } {
    const item: any = this;
    if (item.controls['format'].value === 'Number') {
      if (item.controls.accuracy.value !== null && item.controls.accuracy.value.length <= 0) {
        return {
          accuracy_value_required: true
        };
      }
      if (item.controls.rangeMin.value !== null && item.controls.rangeMin.value.length <= 0) {
        return {
          min_value_required_for_accuracy: true
        };
      }
      if (item.controls.rangeMax.value !== null && item.controls.rangeMax.value.length <= 0) {
        return {
          max_value_required_for_accuracy: true
        };
      }
      if (Number(item.controls.accuracy.value) < Number(item.controls.rangeMin.value) ||
        Number(item.controls.accuracy.value) > Number(item.controls.rangeMax.value)) {
        return {
          accuracy_range_offset: true
        };
      }
    }
    return null;
  }

}
