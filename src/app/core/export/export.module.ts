import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportRoutingModule } from './export-routing.module';
import { ExportComponent } from './export.component';

@NgModule({
  imports: [
    CommonModule,
    ExportRoutingModule
  ],
  declarations: [ExportComponent]
})
export class ExportModule { }
