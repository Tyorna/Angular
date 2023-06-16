import { Injectable } from '@angular/core';
import { Favourites } from '../models/favourites.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../componenti/auth/auth.service';
import { Film } from '../models/film.interface';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {


  fav: Favourites[] = [];
  baseURL = environment.baseURL;

  baseUrl = environment.baseURL;

  constructor(private http: HttpClient, private authSrv: AuthService) {}

  recuperaFavoriti(userId: number) {
      return this.http.get<Favourites[]>(`${this.baseUrl}favorites?userId=${userId}`);
  }

  /* Parametro passato alla richiesta. Interroga favourites passandogli l'userID.
  */

  aggiungiFavorito(favorito: Favourites) {
      return this.http.post(`${this.baseUrl}favorites`, favorito);
  }

  /* Per aggiungere un favorito gli passa i dettagli del favorito.
  */

  rimuoviFavorito(favoritoId: number) {
      return this.http.delete(`${this.baseUrl}favorites/${favoritoId}`);
  }
  /* Per cancellare gli si passa l'id del favorito.
  */
}

