import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TodoService } from './todo.service';

// TODO: Criar durante apresentação

describe('TodoService', () => {
  let service: TodoService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoService);
    http = TestBed.inject(HttpClient);
  });

  it('deve ser injetado', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar o GET com o endpoint correto', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getTodos();
    expect(spy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');
  })

  it('deve retornar um array de todos', () => {
    const todos = [{
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false
    }];
    const spy = spyOn(http, 'get').and.returnValue(of(todos));
    service.getTodos().subscribe(res => {
      expect(res).toEqual(todos);
    });
  });

});
