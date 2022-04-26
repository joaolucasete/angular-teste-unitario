import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// TODO: Criar durante apresentação

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  readonly API = 'https://jsonplaceholder.typicode.com/todos';

  getTodos() {
    return this.http.get<Todo[]>(this.API);
  }

  getTodo(id: number) {
    return this.http.get<Todo>(`${this.API}/${id}`);
  }
}


