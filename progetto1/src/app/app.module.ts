import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { CompletatiComponent } from './components/completati/completati.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Route[] =[
  {
    path: '',
    component: TodosComponent
  },
  {
    path: 'completati',
    component: CompletatiComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    CompletatiComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
