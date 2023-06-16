import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';//mi serve il service con i metodi
import { Router } from '@angular/router';//faccio spostare l'utente
import { NgForm} from '@angular/forms';//mi serve per far funzionare il form

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  isLoading = false;

  constructor(private authSrv: AuthService, private router: Router) {}//solito

  ngOnInit(): void {}

  registra(form: NgForm) {
      this.isLoading = true;
      console.log(form.value);
      try {
          this.authSrv.signup(form.value).subscribe();
          this.router.navigate(['/login']);
          this.isLoading = false
      } catch (error: any) {
          console.error(error);
          if (error.status == 400) {
              alert('Email già registrata!');
              this.router.navigate(['/registrazione']);
          }
          this.isLoading = false
      }
  }
/*metodo che fa la registrazione che riceverà il form.
Per controllo facciamo sempre il console.log dei valori.
DI solito si fa una try catch per riuscire a beccare gli errori.
Parto con il try: this.authsrv.metodosignup(cosa deve registrare).subscirbe.
Lo mandiamo alla pagina di login dopo la registrazione.
Se qualcosa non va facciamo un catch degli errori con il console.log lo vediamo in console. E facciamo il routing per farlo restare dov'è. Vado a scrivere il form nell'html.
*/
}
