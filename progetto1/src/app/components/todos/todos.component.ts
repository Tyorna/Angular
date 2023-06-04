import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo..interface';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];
 @Input()title: any;
 nuovoTodo!: string;
 loading: boolean = true;

  constructor( private todoSrv:TodoService ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.recuperoTask(),
      this.loading = false
     }, 2000);
  }

  async recuperoTask(){
    this.todos= await this.todoSrv.getTodos()
  }

  NewTask(nuovoTodo: string): void {  setTimeout(() => {
    if (!nuovoTodo){
       alert ('Inserire una task');
    } else{
    this.todoSrv.creaTodo(nuovoTodo);
    this.nuovoTodo = "";
  }}, 2000)}

  todoCompletato (id: number, i: number): void{
    setTimeout(() => {
     this.todoSrv.todoFatta({completed: true}, id);
     console.log(this.todos);
     this.recuperoTask();
  }, 2000)}

  elimina (id: number, i: number): void{
    setTimeout(() => {
     this.todos.splice(i, 1);
     console.log(this.todos);
     this.recuperoTask();
  }, 2000)}

  completati():boolean{
    return this.todos.filter( e => e.completed === false).length > 0;
  }

}
