import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilderInputComponent} from './form-builder/form-builder-input/form-builder-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PreviewInputComponent } from './preview/preview-input/preview-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ FormBuilderInputComponent, PreviewInputComponent ],
  exports: [FormBuilderInputComponent, PreviewInputComponent]
})
export class ComponentsModule { }
