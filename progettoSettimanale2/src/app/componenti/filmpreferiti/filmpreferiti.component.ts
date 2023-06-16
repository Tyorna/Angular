import { Component, OnInit } from '@angular/core';
import { FavouritesService } from 'src/app/services/favourites.service'; // importo il service dei favoriti
import { Favourites } from 'src/app/models/favourites.interface'; // importo l'interfaccia dei favoriti
import { Film } from 'src/app/models/film.interface'; // importo l'interfaccia dei film
import { MovieService } from 'src/app/services/movie.service'; //importo il loro service
import { AuthService } from '../auth/auth.service'; //importo i service degli user
import { AuthD } from '../auth/auth-d.interface'; //importo l'interfaccia dell'utente.

@Component({
  selector: 'app-filmpreferiti',
  templateUrl: './filmpreferiti.component.html',
  styleUrls: ['./filmpreferiti.component.scss'],
})
export class FilmpreferitiComponent implements OnInit {
  films!: Film[]; // Imposto la mia variabile film come film array.
  fav!: Favourites[]; //Array di tipo favourites.
  user!: AuthD | null; //una variabile utente (esclamativo perchè se l'utente è arrivato fin qua esiste);
  userId!: number;
  filmId!: number[];

  constructor(
    private filmSrv: MovieService,
    private favSrv: FavouritesService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_utente) => {
      this.user = _utente;
    });

    setTimeout(() => {
      this.listaFav();
    }, 1000);
  }

  listaFav() {
    this.favSrv.recuperaFavoriti(this.user!.user.id).subscribe((userFav: Favourites[]) => {//recupero i favoriti dell'utente loggato
        this.filmId = userFav.map((favorite) => favorite.movieId); //metto gli id in un array di id dei film.
      });
    this.filmSrv.recuperaFilm().subscribe((data: Film[]) => {// filtro i risultato tramite l'array favourites
      this.films = data.filter((film: Film) => this.filmId.includes(film.id));
    });
  }
}
