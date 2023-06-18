import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';//serve per fare le chiamate http.
import { Utente } from '../models/utente.interface';//importo l'interfaccia.
@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  recupera() {
    return this.http.get<Utente[]>(`${this.baseUrl}users`);
}

/*metodo recupera. Gli diciamo che il dato che ti arriva sara un array dentro il quale ci saranno degli oggetti che saranno impacchettati così.
Ecco perchè se non cè corrispondenza tra quello che c'è scritto nel js e quello del nostro modello di dati non funziona niente. E poi dichiaro il nostro url. Stiamo interrogando l'endpoint utente.
Chi lo deve usare? Il component. quindi lo deve importare.
*/

dettaglioUtente(id: number) {
    return this.http.get<Utente>(`${this.baseUrl}users/${id}`);
}

cancella(id: number) {
    return this.http.delete<Utente>(`${this.baseUrl}users/${id}`);
}

aggiungi(dati: Utente) {
    return this.http.post<Utente>(`${this.baseUrl}users`, dati);
}

fotoProfilo(dato: Partial<Utente>, id: number){
  return this.http.put<Utente>(`${this.baseUrl}user/${id}`, dato);
}

}


