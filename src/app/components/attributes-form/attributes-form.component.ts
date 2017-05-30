import { Component, OnInit, Input } from '@angular/core';
import { ValidatiorsService } from '../../services/validatiors.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attributes-form',
  templateUrl: './attributes-form.component.html',
  styleUrls: ['./attributes-form.component.css']
})
export class AttributesFormComponent implements OnInit {

  @Input('form') form: any;
  @Input('categories') categories: any;

  dataTypes: string[] = ['String', 'Object'];
  formats: {} = {
    'String': ['None', 'Number', 'Boolean', 'Date-Time', 'CDATA', 'URI'],
    'Object': []
  };

  constructor(private builder: FormBuilder, private validator: ValidatiorsService) { }

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

  addFormItem() {
    const formTemplate = this.builder.group({
      expanded: false,
      name: [''],
      description: [''],
      deviceResource: [''],
      defaultValue: [''],
      dataType: ['String'],
      format: ['None'],
      rangeMin: [],
      rangeMax: [],
      measureUnit: [],
      precision2: [],
      accuracy: [],
      enumerations: this.builder.array([])
    });
    formTemplate.controls['name'].setValidators([
      Validators.required,
      this.validator.notUnique.bind(this.form)
    ]);
    formTemplate.controls['rangeMin'].setValidators([
      this.validator.rangeValid.bind(formTemplate)
    ]);
    formTemplate.controls['rangeMax'].setValidators([
      this.validator.rangeValid.bind(formTemplate)
    ]);
    formTemplate.controls['precision2'].setValidators([
      this.validator.validPrecision2.bind(formTemplate)
    ]);
    formTemplate.controls['accuracy'].setValidators([
      this.validator.validAccuracy.bind(formTemplate)
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

}
