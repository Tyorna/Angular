import { Component, OnInit } from '@angular/core';

import { AuthD } from '../auth/auth-d.interface';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Utente } from 'src/app/models/utente.interface'; //proviamo ad importare l'interfaccia utente normale.
import { UtentiService } from 'src/app/services/utenti.service'; //proviamo ad importare il service utente normale.

@Component({
  selector: 'app-dettagliutente',
  templateUrl: './dettagliutente.component.html',
  styleUrls: ['./dettagliutente.component.scss'],
})
export class DettagliutenteComponent implements OnInit {
  utenti: Utente[] =
    []; /* utenti sarà un array di tipo utente che all'inizio sarà vuoto. Questo metodo di scrittura si usa quando vogliamo che l'array esista a prescindere.
  Se invece pensiamo che questo array possa anche rimanere vuoto allora conviene usare undefined.
  Ricordarsi che esiste a prescindere, quindi se voglio fare lo spinner devo mettere undefined.
  (Anche il punto esclamativo funziona. Ma con questo modo se per caso i dati non arrivano va in errore quindi in questo caso è pericoloso)*/
  user!: Utente;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private utentiSrv: UtentiService
  ) {} //nel constructor gli dobbiamo dire cosa useremo

  ngOnInit(): void {
    this.route.params.subscribe((parametro) => {
      this.id = +parametro['id'];
      console.log(this.id);
      this.caricaDettagli();
    });
  }
  /*Gli diciamo che quando si carica deve recuperare gli utenti. Un metodo httpclient è un observable, quindi chi lo usa lo deve sottoscrivere. Riceverà un arrai di tipo utenti. ((In questo caso non mi serve perchè voglio solo il dettaglio dell'utente). Ma scrivo comunque per vedere se becco l'errore. Scrivo poi nell'html il ciclo for per stampare la lista degli utenti. L'ng for va fatto sull'elemento che si deve ripetere.)
   */

  caricaDettagli() {
    this.utentiSrv.dettaglioUtente(this.id).subscribe((dettaglio) => {
      this.user = dettaglio;
    });
  }
}
