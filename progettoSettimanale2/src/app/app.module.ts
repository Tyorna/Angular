import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { ProfileComponent } from './componenti/profile/profile.component';
import { FilmComponent } from './componenti/film/film.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';

const rotte: Route[] = [
  {
      path: 'film',
      component: FilmComponent
    },
  {
      path: 'profilo',
      component: ProfileComponent
    },
  {
      path: 'login',
      component: LoginComponent
    },
  {
      path: 'registrazione',
      component: RegistrazioneComponent
    }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    FilmComponent,
    LoginComponent,
    RegistrazioneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rotte)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
