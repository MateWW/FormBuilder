import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormLoaderService} from './services/form-loader.service';
import {FormBuilderComponent} from './application/form-builder/form-builder.component';
import {FormBuilderInputComponent} from './application/form-builder/form-builder-input/form-builder-input.component';
import {PreviewComponent} from './application/preview/preview.component';
import {PreviewInputComponent} from './application/preview/preview-input/preview-input.component';
import {ExportComponent} from './application/export/export.component';
import {InputTypeComponent} from './shared/ui-element/input-type/input-type.component';
import {SelectConditionTypeComponent} from './shared/ui-element/select-condition-type/select-condition-type.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    FormBuilderInputComponent,
    PreviewComponent,
    PreviewInputComponent,
    ExportComponent,
    InputTypeComponent,
    SelectConditionTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FormLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
