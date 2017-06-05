import { ValidatiorsService } from '../../../../services/validatiors.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

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

  /**
   * Start controls to be used in attributtes of form
   */
  loadForm() {
    const formControls = this.addFormItem();
    const formItems = (<FormArray>this.category.controls.items);
    formItems.push(formControls);
    return formItems;
  }

  /**
   * Add block of controls in attributte nested form
   */
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
      newEnumeration: [''],
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

  /**
   * Reset all values to default value when Format control value change
   * @param item
   */
  resetValues(item: any) {
    const initValue = null;
    if (item.format.value === 'Number') {
      item.rangeMin.reset(0);
      item.rangeMax.reset(0);
      item.measureUnit.reset();
      item.precision2.reset(0);
      item.accuracy.reset(0);
      item.newEnumeration.reset('');
      while ((<FormArray>item.enumerations).length) {
        (<FormArray>item.enumerations).removeAt(0);
      }
    } else {
      item.rangeMin.reset();
      item.rangeMax.reset();
      item.measureUnit.reset();
      item.precision2.reset();
      item.accuracy.reset();
      item.newEnumeration.reset('');
      item.enumerations.reset([]);
    }
  }

  /**
   * Add new dinamyc item in attributes nested form
   * @param category
   */
  addItem(category: FormArray) {
    const formItems = (<FormArray>category);
    const formControls = this.addFormItem();
    formItems.push(formControls);
    this.category.reset(this.category.value);
  }

  /**
   * Delete attribute from selected category
   * @param attribute
   * @param position
   */
  deleteAttribute(attribute: any, position: number) {
    const currentAttribute = <FormArray>attribute;
    currentAttribute.removeAt(position);
    this.category.reset(this.category.value);
  }

  /**
   * Add enumeration item control for list of enumerations
   * @param enumeration
   */
  addEnumeration(enumeration: any, enumerationText: any) {
    if (enumerationText.value.length === 0) {
      return;
    }
    const currentEnumeration = <FormArray>enumeration;
    currentEnumeration.push(new FormControl(enumerationText.value, [Validators.required]));
    enumerationText.setValue('');
  }

  /**
   * Remove enumeration for a selected position in list
   * @param enumeration
   * @param position
   */
  removeEnumeration(enumeration: any, position: number) {
    const currentEnumeration = <FormArray>enumeration;
    currentEnumeration.removeAt(position);
  }

}
