import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FormBuilderComponent} from './core/form-builder/form-builder.component';


const routes: Routes = [
  {path: '' , component: FormBuilderComponent}
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
