import { Injectable } from '@angular/core';
import { Todo } from '../models/todo..interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  todos: Todo[] = [];

  constructor() {}

  creaTodo(title: string):void {
    this.todos.push({ title, completed: false, id: this.todos.length +1});
    console.log(this.todos)
    console.log('Funziona?');
  }

  todoFatta(dato: Partial<Todo>, id:number):void{
     this.todos = this.todos.map((todo) =>
     todo.id == id ? { ...todo, ...dato} : todo);
  }

  async getTodos(){
    return this.todos;
  }
}
