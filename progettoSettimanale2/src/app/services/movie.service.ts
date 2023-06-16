import { Injectable } from '@angular/core';
import { Film } from '../models/film.interface'; //Importo l'interfaccia
import { HttpClient } from '@angular/common/http';//Importo l'httpclient
import { environment } from 'src/environments/environment';// Importo l'environment dove ho scritto l'url.

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  recuperaFilm() {
      return this.http.get<Film[]>(`${this.baseURL}movies-popular`);
  }
 /* Metodo per recuperare la lista dei film. Chiamo l'http e metto in una variabile film i Film dall'interfaccia.
    Prendendoli dall'url con endpoint movies-popular(Controllare come è scritto nel db.json perchè deve corrispondere).
    Poi vado nel component film.ts per usare questo metodo.
 */

dettagliFilm(id: number){
  return this.http.get<Film>(`${this.baseURL}movies-popular/${id}`);
}
// Ricordarsi di non mettere in questo caso le [] dopo film, perchè ne ritorna 1 e non un array

}
