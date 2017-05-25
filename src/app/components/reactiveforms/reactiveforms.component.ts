import { Component, OnInit } from '@angular/core';

import { Form } from '../../interface/form';
import { FormControl,FormGroup,Validators,FormArray,FormBuilder } from "@angular/forms";

import {MdIconRegistry} from '@angular/material';



@Component({
  selector: 'app-reactiveforms',
  templateUrl: './reactiveforms.component.html',
  styleUrls: ['./reactiveforms.component.css']
})
export class ReactiveformsComponent implements OnInit {

  form:FormGroup;

  // categories:string[]=["Device info","Sensors","Settings","Commands","Metadata"];
  categories:string[]=["Device info","Metadata"];

  constructor(private builder: FormBuilder) {}

  ngOnInit(){


    this.form=this.builder.group({
      categories:this.builder.array([])
    });
    let categories=(<FormArray>this.form.controls["categories"]);
    for(let i in this.categories){
      let categoryGroup=this.loadForm(this.categories[i]);
      categories.push(categoryGroup);
    }
  }

  loadForm(categoryName){
    
      let categoryGroup=this.builder.group({
        categoryName:[categoryName],
        items:this.builder.array([])
      });
      let formControls=this.addFormItem();
      let formItems=(<FormArray>categoryGroup.controls.items);
      formItems.push(formControls);
      return (categoryGroup);
    
  }

  addCategory(){
    let catName=("New category "+(this.categories.length+1));
    this.categories.push(catName);
    let categories=(<FormArray>this.form.controls["categories"]);
    let categoryGroup=this.loadForm(catName);
    categories.push(categoryGroup);
  }

  addFormItem(){
    let formTemplate=this.builder.group({
      name:["",Validators.required],
      description:[""],
      deviceResource:[""],
      defaultValue:[""],
      dataType:[""],
      format:[""],
      enumerations:this.builder.array([])
    });
    return formTemplate;
  }

  addItem(category:FormArray){
    let formItems=(<FormArray>category);
    let formControls=this.addFormItem();
    formItems.push(formControls);
  }

  save(){
    console.log(this.form.value);
  }


}
