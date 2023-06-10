import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  films: Film[] = [];

  constructor(private filmSrv: MovieService) { }

  ngOnInit(): void {
    this.filmSrv.recuperaFilm().subscribe((films: Film[]) => {
      this.films = films;
      console.log(this.films);
  });
  }

}
