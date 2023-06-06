import { Component, ViewChild } from '@angular/core'; // ViewChild è utilizzato per controllare lo stato del form (vedi sotto)
import { NgForm } from '@angular/forms'; // Utilizzato per gestire l'oggetto form

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'form';

    @ViewChild('contenitoreForm', {static: true}) contenitoreForm!: NgForm; // Con ViewChild static:true si recepisce il cambiamento dello stato del child indicato PRIMA dello stato afterViewInit, quindi anche se in fase di controllo il valore nel template cambia, il valore nel component rimane comunque allineato; con la classe NgForm gestiamo il form come un'unica istanza formGroup, quindi controlliamo i diversi valori nel form come elementi di un'unica istanza
    name: string = '';
    alterEgo: string = '';
    power: string = '';
    enemy: string = '';
    planet: string = '';
    weakness: string = ''


    userForm = {
        name: '',
        alterEgo: '',
        power: '',
        enemy: '',
        planet: '',
        weakness: ''
    }

    user: any = {
        name: '',
        alterEgo: '',
        power: '',
        enemy: '',
        planet: '',
        weakness: ''
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.contenitoreForm.statusChanges?.subscribe(stato => {
            console.log(this.contenitoreForm);
            console.log(`Stato del form: ${stato}`);
        });
    }

    inviaForm() {
        console.log(`Form inviato: ${this.contenitoreForm}`);
        this.user.name = this.contenitoreForm.value.userHero.name;
        this.user.alterEgo = this.contenitoreForm.value.userHero.alterEgo;
        this.user.power = this.contenitoreForm.value.userHero.power;
        this.user.enemy = this.contenitoreForm.value.userHero.enemy;
        this.user.planet = this.contenitoreForm.value.userHero.planet;
        this.user.weakness = this.contenitoreForm.value.userHero.weakness;

        this.contenitoreForm.reset();
    }

}
