import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatiorsService } from '../../../../services/validatiors.service';


@Component({
  selector: 'app-attributes-form',
  templateUrl: './attributes-form.component.html',
  styleUrls: ['./attributes-form.component.css']
})
export class AttributesFormComponent implements OnInit {

  @Input('category') category: any;

  dataTypes: string[] = ['String', 'Object'];
  formats: {} = {
    'String': ['None', 'Number', 'Boolean', 'Date-Time', 'CDATA', 'URI'],
    'Object': []
  };

  constructor(private builder: FormBuilder, private validator: ValidatiorsService) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    const formControls = this.addFormItem();
    const formItems = (<FormArray>this.category.controls.items);
    formItems.push(formControls);
    return formItems;
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
      this.validator.notUnique.bind(this.category)
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

  resetValues(item: any) {
    const initValue = null;
    if (item.format.value === 'Number') {
      item.rangeMin.reset(0);
      item.rangeMax.reset(0);
      item.measureUnit.reset();
      item.precision2.reset(0);
      item.accuracy.reset(0);
    } else {
      item.rangeMin.reset();
      item.rangeMax.reset();
      item.measureUnit.reset();
      item.precision2.reset();
      item.accuracy.reset();
    }
  }

  addItem(category: FormArray) {
    const formItems = (<FormArray>category);
    const formControls = this.addFormItem();
    formItems.push(formControls);
    this.category.reset(this.category.value);
  }

  deleteAttribute(attribute: any, position: number) {
    const currentAttribute = <FormArray>attribute;
    currentAttribute.removeAt(position);
    this.category.reset(this.category.value);
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
    return;
  }

}
