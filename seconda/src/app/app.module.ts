import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { Comp02Component } from './comp02/comp02.component';
import { Comp03Component } from './comp03/comp03.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    Comp02Component,
    Comp03Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
