import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormBuilderRoutingModule} from './form-builder-routing.module';
import {ComponentsModule} from '../../components/components.module';
import {FormBuilderComponent} from './form-builder.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormBuilderRoutingModule,
    ComponentsModule
  ],
  declarations: [FormBuilderComponent],
})
export class FormBuilderModule {
}
