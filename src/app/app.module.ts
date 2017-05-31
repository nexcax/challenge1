import { AppComponent } from './app.component';
import { AttributesFormComponent } from './components/nested-forms/attributes-container/attributes-form/attributes-form.component';
import { NestedFormsComponent } from './components/nested-forms/nested-forms.component';
import { ErrorMessagesDirective } from './directives/error-messages.directive';
import { HasErrorDirective } from './directives/has-error.directive';
import { ValidatiorsService } from './services/validatiors.service';
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
import { AttributesContainerComponent } from './components/nested-forms/attributes-container/attributes-container.component';

@NgModule({
  declarations: [
    AppComponent,
    NestedFormsComponent,
    ErrorMessagesDirective,
    HasErrorDirective,
    AttributesFormComponent,
    AttributesContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
