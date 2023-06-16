import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //importiamo l'httpinterceptor. Se non c'è cessione del token non fa cosa deve fare.
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { ProfileComponent } from './componenti/profile/profile.component';
import { FilmComponent } from './componenti/film/film.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { AuthGuard } from './componenti/auth/auth.guard';
import { ErrorPageComponent } from './componenti/error-page/error-page.component';
import { HomeComponent } from './componenti/home/home.component';
import { FilmpreferitiComponent } from './componenti/filmpreferiti/filmpreferiti.component';
import { DettagliutenteComponent } from './componenti/dettagliutente/dettagliutente.component';
import { AuthInterceptor } from './componenti/auth/auth.interceptor';
import { DettagliFilmComponent } from './componenti/dettagli-film/dettagli-film.component';// importiamo per guardare le chiamate http.

const rotte: Route[] = [
  {
      path: 'film',
      component: FilmComponent,
  },
      {
        path: 'film/:id', //per arrivare ai dettagli dell'utente, è una rotta con parametri
        component: DettagliFilmComponent
      },
      //canActivate: [AuthGuard]
      /*Rotta che possiamo vedere solo se siamo loggati. Viene creata con authGuard attraverso un sistema di true e false. (spiegato nel componente).
      */
  {
      path: 'profilo',
      component: ProfileComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'filmpref',
          component: FilmpreferitiComponent
        },
        {
          path: 'dettagli/:id', //per arrivare ai dettagli dell'utente, è una rotta con parametri
          component: DettagliutenteComponent
        }
      ]
    },
  {
      path: 'login',
      component: LoginComponent
    },
  {
      path: '',
      component: HomeComponent
    },
  {
      path: 'registrazione',
      component: RegistrazioneComponent
    },
  {
      path: '**',
      component: ErrorPageComponent
    }

    // I path scritti dopo questo non esistono, quindi va sempre scritto per ultimo.
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    FilmComponent,
    LoginComponent,
    RegistrazioneComponent,
    ErrorPageComponent,
    HomeComponent,
    FilmpreferitiComponent,
    DettagliutenteComponent,
    DettagliFilmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(rotte)
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}], // gli si dice che a fare il sevizio sara l'interceptor con multi true perchè ce ne sono di più. Essendo stato chiamato qua intercetterà tutte le chiamate http da qualunque parte provengano.
  bootstrap: [AppComponent]
})
export class AppModule { }
