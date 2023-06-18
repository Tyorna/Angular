import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//Perchè deve essere reindirizzato dopo il login.
import { NgForm } from '@angular/forms';// E un form quindi da importare. Nel caso di login e quasi sempre un td form.
import { AuthService } from '../auth/auth.service';//Da importare per usare i metodi
import { AuthD } from '../auth/auth-d.interface';// Importiamo per fare il login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(private authSrv: AuthService, private router: Router) {}//metto private i due componenti che mi servono.

  ngOnInit(): void {
  }

  accedi(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
        this.authSrv.login(form.value).subscribe();
        setTimeout(() => {
        if(localStorage.getItem("user")){
        this.isLoading = false;
        alert('Login effettuato!');
        this.router.navigate(['/profilo']);
      } else {
      this.isLoading = false;
      alert('Login sbagliato!');
      this.router.navigate(['/login']);
      }
    }, 3000);
    } catch (error) {
      alert(error);
  }
  }
  /* Facciamo il metodo accedi che riceve il form.
  Facciamo il console.log per vedere il funzionamento e poi facciamo un try/catch.
  Nel try chiamiamo il login e poi lo sottoscriviamo, facciamo un alert e poi lo spediamo con router navigate alla pagina del profilo. Nel catch invece prendiamo come argomento l'errore che faremo poi stampare in console. E facciamo un alert che ci avverte che stiamo facendo un login errato.
  Ora ci andiamo a creare il nostro form
  */
}
