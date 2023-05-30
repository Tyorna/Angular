import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor() { }
  async recupera(){
   return (await fetch ("assets/db.json")).json()
  }
}

