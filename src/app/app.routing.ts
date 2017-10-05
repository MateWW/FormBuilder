import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormBuilderComponent} from './application/form-builder/form-builder.component';
import {PreviewComponent} from './application/preview/preview.component';
import {ExportComponent} from './application/export/export.component';

const routes: Routes = [
  {path: '' , component: FormBuilderComponent},
  {path: 'preview' , component: PreviewComponent},
  {path: 'export' , component: ExportComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
