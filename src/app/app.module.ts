import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app.routing';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {FormLoaderService} from './services/form-loader.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ FormLoaderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
