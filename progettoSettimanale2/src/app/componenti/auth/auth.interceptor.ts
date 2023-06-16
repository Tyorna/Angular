import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';//importa perchè avra bisogno anche lui di gestire la presenza dello user
import { switchMap, take } from 'rxjs/operators'// take come la guard. E importa switch map (operatore che è usato per gestire i valori emessi nell'observable in un nuovo observable. Usato per gestire le chiamate asincrone. Prendere la richiesta come arriva e trasformarla in qualcos'altro. Se arriva una nuova chiamata desottoscrive il precedente e sottoscrive quello nuovo)

/*
L'interceptor intercetta le chiamate solo per il fatto di esistere.
*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) {} //importo come sempre il private authsrv

  newReq! : HttpRequest<any>; //creo una nuova richiesta che sara di tipo httprequest di tipo any (come arriva ce lo prendiamo).

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.authSrv.user$.pipe(take(1), switchMap(user => {
            if (!user) {
                console.log(request);
                console.log(this.newReq);
                return next.handle(request);
            }

            this.newReq = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${user.accessToken}`)
            });

            console.log(request);
            console.log(this.newReq);
            return next.handle(this.newReq);
        }));

        /* Per adesso, come la guard, prendere quello che arriva e infilarlo in un flusso, prende la prima risposta.
        switch map: scriverai dentro utente il valore o null. Se l'utente è null, (in realtà noi abbiamo bloccato i form quindi non la vedremo mai in azione), facciamo il console.log della richiesta e della nuova richiesta,
        e poi facciamo il return del next.handle(request);.
        l'interceptor emette comunque una richiesta, cosi la invia senza token.
        Se invece l'untente c'è:
        devi fare una copia della richiesta, modificare l'headers e mettere l'autorizzazione con il token dell'utente.
        A questo punto si fa next.handle della nuova richiesta.

        */
  }
}
