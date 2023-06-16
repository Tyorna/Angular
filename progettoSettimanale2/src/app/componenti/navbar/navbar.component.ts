import { Component, OnInit } from '@angular/core';
import { AuthD } from '../auth/auth-d.interface';// Importiamo per fare il logout
import { AuthService } from '../auth/auth.service';// Importiamo per fare il logout

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: AuthD | null; //variabile utente che può essere di tipo authdata o null.

    constructor(private authSrv: AuthService) {} //Mettiamo il solito authsrv che ci serve usare.

    ngOnInit(): void {
        this.authSrv.user$.subscribe((_user) => {
            this.user = _user;
        });
    }

    /* COme fa la navbar a sapere che c'è l'utente? Ci serve sottoscrivere l'utente.
    Quindi all'oninit, sottoscriviamo l'utente.
    Le diciamo: riceverai un utente o null e se c'è ci stanno i dato in utente (in questo caso user.).
    La navbar verifica se c'è l'utente perchè ci sono componenti che compaiono solo se c'è l'utente o meno.
    */

    logout() {
        this.authSrv.logout();
    }
    // Al metodo logout quando cliccato faccio logout.

}
