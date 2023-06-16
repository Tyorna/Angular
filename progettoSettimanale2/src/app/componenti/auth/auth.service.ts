import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';// importare.
import { BehaviorSubject, throwError } from 'rxjs';//Un tipo particolare di observable che deve avere un valore iniziale, emette in tempo reale il suo cambiamento e comunica con chi lo intercetta. Qua ci serve per sapere se l'utente è loggato o no. Ci importiamo anche un throwError per intercettare gli errori.
import { JwtHelperService } from '@auth0/angular-jwt';// Per gestire la cessione del token. (gestita poi dall'interceptor).
import { tap, catchError } from 'rxjs/operators';// l'operatore tap permette di gestire effetti o modifiche senza intaccare l'operatore stesso. Recepisce il valore dell'observable e lo manipola a beneficio degli altri. Importiamo anche catch perchè prima abbiamo importato throw.
import { AuthD } from './auth-d.interface';//Abbiamo bisogno di un interfaccia che gestirà l'utente ma che gestirà la sua autenticazione.
import { environment } from 'src/environments/environment';//Perchè ci serve il baseUrl
import { Router } from '@angular/router';//Visto che mandiamo l'utente da qualche parte dopo aver fatto la registrazione o il login.

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();//Classe che eroga dei metodi, uno dei quali è la cessione del token.
  baseURL = environment.baseURL;//recupero l'url
  private authSubj = new BehaviorSubject<null | AuthD>(null); //Vuole un valore iniziale, in partenza gli diamo null. C'è poi qualcuno che deve osservare questo BS
  user!: AuthD;

  user$ = this.authSubj.asObservable();// Lui è quello che osserva il BS. Gli stiamo dicendo che questo deve andare avanti e indietro nell'applicazione come observable. Il dollaro è obbligatorio per avvertire che va in giro ad osservare.
  timeoutLogout: any; //variabile globale per la scadenza del token.

  constructor(private http: HttpClient, private router: Router) { }//Come al solito

  login(data: { email: string; password: string }) {
    return this.http.post<AuthD>(`${this.baseURL}login`, data).pipe(
        tap((data) => {
            console.log(data);
            this.authSubj.next(data);
            this.user = data;
            console.log(this.user);
            localStorage.setItem('user', JSON.stringify(data));
            this.autoLogout(data);
        }),
        catchError(this.errors)
    );
}
/* ANche login riceverà dei dati, email e password di tipo string.
Servono solo questi due per fare il login. Scriviamo poi il metodo, che va ad interrogare il login.
Perchè è una post?
Riceve email e password e deve scrivere tutto l'user, se la post va a buon fine va a cedere il token.
Poi si va ad infilare la risposta (.pipe) in un flusso che manda in giro la risposta per l'applicazione.
Usiamo quindi l'operatore tap che riceverà i dati che stanno nell BS.
Ce li guardiamo prima in console, poi diremo authSubj.next(una volta che ti sono arrivati i dati che devo fare? Prenderli);
Poi this.utente diventa i dati arrivati.
Li sicriviamo in quella variabile. Ne facciamo poi il console.log per controllare quello che è arrivato. Poi lo metto nel localStorage.
Post che contemporaneamente legge e scrive. Va a leggere la corrispondenza, se c'è cede il token e va a scrivere poi nelle nostre variabili (authSubj) non nel json.
This.autoLogout ancora non spiegato.*/

restore() {
    const user = localStorage.getItem('user');
    if (!user) {
        return;
    }
    const userData: AuthD = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
        return;
    }
    this.authSubj.next(userData);
    this.autoLogout(userData);
}

/*Recuperare l'user dal localStorage. Se non c'e non succede nulla.
Se invece è presente recupera l'utente, controlla che il token, verificando la data scritta, altrimenti vai a scrivere nell'authsub quello che c'è nel localstorage.
Dove si deve chiamare il metodo restore?
Proviamo a chiamarlo dentro app-component.ts.
Gli creo il substractor e gli dico che all'onInit deve fare il restore di this.authservice. this.authSubj.restore();
*/

signup(data: {
    name: string;
    email: string;
    password: string;
}) {
    return this.http.post(`${this.baseURL}register`, data);
}

/*Signup riceverà dei dati dal form e trascrivo che cosa riceverà.
E ritornerà il post()register(così si chiama l'endpoint che fa la registrazione), di data.
*/

logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    if (this.timeoutLogout) {
        clearTimeout(this.timeoutLogout);
    }
}

/*
Logout: Non ha bisogno di parametri. Diciamo al nostro BS di tornare a null, svuota i parametri e dice al server che l'utente non c'è più.
Rimuoviamo l'user dal localStorage e lo facciamo reindirizzare alla pagina home.
Andiamo a manipolare la navbar per fare il logout. Andiamo a scrivere nel suo ts.
*/

autoLogout(data: AuthD) {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(
        data.accessToken
    ) as Date;
    const expirationMilliseconds =
        expirationDate.getTime() - new Date().getTime();
    this.timeoutLogout = setTimeout(() => {
        this.logout();
    }, expirationMilliseconds);
}

/* Controlla la scadenza del token.
prende la scadenza del token. Faccio una costante del tempo scadenza che sarà expirationDate meno i millisecondi meno
Tempo manca alla scadenza del token.
timeoutLogout: chiamerà il logout quando tutto scade (expirationMilliseconds).
GLi abbiamo detto quando è finito il tempo fai il logout. Questo metodo lo chiamiamo dopo il login, sul restore (deve verificare che il token sia ancora valido).

*/

recuperaUtente(id: number) {
  return this.http.get<AuthD>(`${this.baseURL}users/${id}`);
}

private errors(err: any) {
    switch (err.error) {
        case 'Email already exists':
            return throwError('Utente già presente');
            break;

        case 'Email format is invalid':
            return throwError('Formato mail non valido');
            break;

        default:
            return throwError('Errore nella chiamata');
            break;
    }
}
}
