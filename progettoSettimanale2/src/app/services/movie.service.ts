import { Injectable } from '@angular/core';
import { Film } from '../models/film.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  films: Film[] = [];
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  recuperaFilm() {
      return this.http.get<Film[]>(`${this.baseURL}movies-popular`);
  }
}
