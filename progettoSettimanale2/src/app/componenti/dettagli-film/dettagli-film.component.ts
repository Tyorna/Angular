import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.interface'; //importo l'interfaccia film
import { MovieService } from 'src/app/services/movie.service'; //importo il suo service
import { ActivatedRoute, Router } from '@angular/router';//deve anche importare activateRout e router perchè abbiamo bisogno di andarci a leggere quel parametro quindi dobbiamo importare questi due.
@Component({
  selector: 'app-dettagli-film',
  templateUrl: './dettagli-film.component.html',
  styleUrls: ['./dettagli-film.component.scss']
})
export class DettagliFilmComponent implements OnInit {

  films!: Film;
 //films!: Film; //abbiamo un film di tipo film
 id!: number; // gli diciamo che gli arriva un parametro id.

  constructor(private filmSrv: MovieService, private router: Router, private route: ActivatedRoute) { }// scrivo tutti i private che mi servono

  ngOnInit(): void {
    this.route.params.subscribe(parametro => {
      this.id = +parametro['id'];
      console.log(this.id);
      this.caricaDettagli();
    });
  }
/*All'ngoninit deve recuperare la roba quindi gli diciamo this.route.params(vatti a leggere i parametri della rotta), ne riceverai 1 perchè è uno che ce ne serve. E gli diremo che l'id è uguale a piu parametro. (più per trasformarlo sempre in positivo).
Ci si fa il console.log di prova per verificare che tutto funzioni.
Poi si fa caricaDettagli()che ancora non è stato scritto.
*/

caricaDettagli(){
  this.filmSrv.dettagliFilm(this.id).subscribe( dettaglio => {
    this.films = dettaglio;
  })
}



/*
Nel carica dettagli gli diremo di prendere i dettagli utente con quell'id e gli passo il dettaglio dell'utente e lo andiamo a scrivere nell'html
*/
}
