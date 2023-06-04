import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-completati',
  templateUrl: './completati.component.html',
  styleUrls: ['./completati.component.scss']
})
export class CompletatiComponent implements OnInit {

  todos = this.todoSrv.todos;
 @Input()title: any;
 nuovoTodo!: string;
 loading: boolean = true;

  constructor(private todoSrv:TodoService ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.recuperoTask(),
      this.loading = false
     }, 2000);
  }
  async recuperoTask(){
    this.todos= await this.todoSrv.getTodos()
  }

 completati():boolean{
   return this.todos.filter( e => e.completed === true).length > 0;
 }
}
