import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AttiviComponent } from './attivi/attivi.component';
import { NonattiviComponent } from './nonattivi/nonattivi.component';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "attivi",
    component: AttiviComponent
  },

  {
    path: "nonAttivi",
    component: NonattiviComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AttiviComponent,
    NonattiviComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
