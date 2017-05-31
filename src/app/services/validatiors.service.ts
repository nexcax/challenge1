import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidatiorsService {

  constructor() { }

  // Validations definitions
  notUnique(control: FormControl): { [s: string]: boolean } {
    const form: any = this;
    if (!control.pristine) {
        const items = form.controls.items.value;
        for (let j = 0; j < items.length; j++) {
          if (items[j].name === control.value) {
            return {
              not_unique: true
            };
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
      const diff = Number(item.controls.rangeMax.value) - Number(item.controls.rangeMin.value);
      if ((diff % Number(item.controls.accuracy.value)) !== 0) {
        return {
          accuracy_not_valid: true
        };
      }
    }
    return null;
  }

}
