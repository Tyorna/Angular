import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,  Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSrv: AuthService, private router: Router) { } //Usiamo sia router che authservice.

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authSrv.user$.pipe(
        take(1),
        map((user) => {
            if (user) {
                return true;
            }
            alert(
                'Per visualizzare questa risorsa devi essere loggato!\nAccedi o registrati'
            );
            return this.router.createUrlTree(['/login']);
        })
    );
}

/*In gran parte si scrive da sola.
Noi ci importiamo anche router per rimandare l'utente alla pagina login. CI serve il service per sapere se l'utente sta dentro o no.
Poi ci servono map e take. Map è come per gli array (riceve la risposta e ne crea una copia) Take ci dice quanti valori vogliamo prendere quando facciamo una chiamata.
Dobbiamo verificare che ci sia l'utente come fatto nella navbar ma in maniera piu semplice. Return this. authserv. user$.pipe (prendi il valore che arriva (1) e mappalo) riceverai un utente, se c'è fai return true, se invece non c'è lo intercettiamo e con un alert lo avvertiamo prima di reindirizzarlo al login.
Una guard deve restituire true o false quindi non può essere sottoscritta.
Fatto questo andiamo nel sistema di navigazione e gli diciamo in che rotte non può andare.
*/

}
