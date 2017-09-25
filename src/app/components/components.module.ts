import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilderInputComponent} from './form-builder/form-builder-input/form-builder-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ FormBuilderInputComponent ],
  exports: [FormBuilderInputComponent]
})
export class ComponentsModule { }
