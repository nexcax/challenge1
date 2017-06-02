import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attributes-container',
  templateUrl: './attributes-container.component.html'
})
export class AttributesContainerComponent implements OnInit {

  form: FormGroup;

  @Input('categories') categories: string[];

  constructor(private builder: FormBuilder) { }

  /**
   * Start the component with Input of Categories
   */
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

  /**
   * Start the controls in a category inside a form
   * @param categoryName 
   */
  loadForm(categoryName) {
    const categoryGroup = this.builder.group({
      categoryName: [categoryName],
      items: this.builder.array([])
    });
    return categoryGroup;
  }

  /**
   * Reffer to final process for related submit event in form
   */
  save() {
    this.form.reset(this.form.value);
  }

}
