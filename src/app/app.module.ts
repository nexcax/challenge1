import { AppComponent } from './app.component';
import { NestedFormsComponent } from './components/nested-forms/nested-forms.component';
import { ErrorMessagesDirective } from './directives/error-messages.directive';
import { HasErrorDirective } from './directives/has-error.directive';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdGridListModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
    MdTabsModule,
    MdToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ValidatiorsService } from './services/validatiors.service';
import { AttributesFormComponent } from './components/attributes-form/attributes-form.component';



// Angular material definition

// Component for reactive forms

@NgModule({
  declarations: [
    AppComponent,
    NestedFormsComponent,
    ErrorMessagesDirective,
    HasErrorDirective,
    AttributesFormComponent
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
  providers: [ValidatiorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
