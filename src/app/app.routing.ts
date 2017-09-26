import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '' , loadChildren: './core/form-builder/form-builder.module#FormBuilderModule'},
  {path: 'preview' , loadChildren: './core/preview/preview.module#PreviewModule'},
  {path: 'export' , loadChildren: './core/export/export.module#ExportModule'},
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
