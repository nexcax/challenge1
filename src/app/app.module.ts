import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Angular material definition
import {
  MdInputModule,
  MdCheckboxModule,
  MdTabsModule,
  MdGridListModule,
  MdCardModule,
  MdButtonModule,
  MdListModule
} from '@angular/material';

// Component for reactive forms
import { ReactiveformsComponent } from './components/reactiveforms/reactiveforms.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveformsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdCheckboxModule,
    MdTabsModule,
    MdGridListModule,
    MdCardModule,
    MdButtonModule,
    MdListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
