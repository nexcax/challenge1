import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Angular material definition
import {
  MdInputModule,
  MdCheckboxModule,
  MdTabsModule,
  MdGridListModule,
  MdCardModule,
  MdButtonModule,
  MdListModule,
  MdSelectModule,
  MdToolbarModule
} from '@angular/material';

// Component for reactive forms
import { NestedFormsComponent } from './components/nested-forms/nested-forms.component';
import { ErrorMessagesDirective } from './directives/error-messages.directive';
import { HasErrorDirective } from './directives/has-error.directive';

@NgModule({
  declarations: [
    AppComponent,
    NestedFormsComponent,
    ErrorMessagesDirective,
    HasErrorDirective
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
    MdListModule,
    MdSelectModule,
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
