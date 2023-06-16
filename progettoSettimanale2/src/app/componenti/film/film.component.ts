import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.interface';// importo l'interfaccia dei film
import { MovieService } from 'src/app/services/movie.service'; //importo il loro service
import { FavouritesService } from 'src/app/services/favourites.service';// importo il service dei favoriti
import { Favourites } from 'src/app/models/favourites.interface';// importo l'interfaccia dei favoriti
import { AuthService } from '../auth/auth.service';//importo i service degli user
import { AuthD } from '../auth/auth-d.interface';//importo l'interfaccia dell'utente.

/*Quando il componente viene visualizzato deve leggere la lista film e colorare le icone del film preferito.
Anche se sembra un solo processo in realtà sono due processi diversi.
*/
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  films!: Film[]; // Imposto la mia variabile film come film array.
  fav!: Favourites[];//Array di tipo favourites.
  user!: AuthD | null; //una variabile utente (esclamativo perchè se l'utente è arrivato fin qua esiste);
  userId!: number;

  constructor(private filmSrv: MovieService, private favSrv: FavouritesService, private authSrv: AuthService) { } //private i soliti service che mi servono

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_utente) => {
        this.user = _utente;
    });
    setTimeout(() => {
        this.recuperaFavoriti(this.user!.user.id);
        this.recuperaFilm();
    }, 1000);
}

  /*nell'oninit gli dico di recuperare i film, con this.filmsrv. che usa il metodo scritto nel service e lo sottoscrive.
  Poi chiamiamo nell'html per far comparire la lista dei film.
  Per simulare la risposta e togliere errori strani lo metto in un set timeout.
  */

recuperaFilm(): void {
    this.filmSrv.recuperaFilm().subscribe((films: Film[]) => {
        this.films = films;
    });
}

 /*Mi arriva un array di tipo Film.
  */

recuperaFavoriti(userId: number): void {
    this.favSrv
        .recuperaFavoriti(userId)
        .subscribe((likes: Favourites[]) => {
            this.fav = likes;
        });
}
/*recupera favoriti di questo userid. Lui dopo aver verificato che l'utente ci sta, verifica i favoriti, va nell'array e verifica quali sono i preferiti di questo utente.
  */

aggiungiFavorito(idFilm: number): void {
    const favorito: Favourites = {
        userId: this.user!.user.id,
        movieId: idFilm,
    };

    this.favSrv.aggiungiFavorito(favorito).subscribe(() => {
        this.recuperaFavoriti(this.user!.user.id);
    });
}

/*Aggiungere: quando faccio click sul button il button gli passa l'id del film, l'id dell'utente ce l'ho. Mando al service un oggetto che contiene i due id, il suo se lo aggiunge da solo.
Una volta che la subscribe ha risposto rifammi recupera i favoriti e fammi quindi refresh della lista
  */

eliminaFavorito(film: Film): void {
    const idFav = this.getIdFavorito(film);
    if (idFav) {
        this.favSrv.rimuoviFavorito(idFav).subscribe(() => {
            this.recuperaFavoriti(this.user!.user.id);
        });
    }
}

/*Elimina: quando faccio click sul button gli passa l'intero oggetto film. Perchè devo recuperare l'id del flm, quindi si prende l'id.
GetId favorito riceve l'oggetto e fa il find all'interno dell'id favoriti.
Trova il film che ha il movieid uguale al film.
E restituiscilo (punto interrogativo perchè potrebbe essere undefined).
Se era un favorito lo elimina e recupera di nuovo poi la lista dei favoriti.
Non lo faccio fare all'oninit perchè è dentro un settimeout quindi dovrei aspettare ogni volta che clicco il pulsante.
  */


isFavorito(film: Film): boolean {
    return this.fav.some((f) => f.movieId === film.id);
}

getIdFavorito(film: Film): number | undefined {
    const favorito = this.fav.find((f) => f.movieId === film.id);
    return favorito?.id;
}

  }

