import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attributes-container',
  templateUrl: './attributes-container.component.html',
  styles: []
})
export class AttributesContainerComponent implements OnInit {

  form: FormGroup;

  @Input('categories') categories: string[];

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
    return categoryGroup;
  }

  save() {
    console.log(this.form.value);
  }

  viewFormStatus() {
    console.log(this.form);
  }

}
