import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Hero } from '../api/hero';
import { HeroService } from './hero.service';
import { concat, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('HeroService', () => {
  let service: HeroService;
  let http: HttpClient;

  let mockHero: Hero[] = [
    { id: 1, name: 'Superman' },
    { id: 2, name: 'Batman' },
    { id: 3, name: 'Narco' },
    { id: 4, name: 'Bombasto' },
    { id: 5, name: 'Celeritas' },
    { id: 6, name: 'Magneta' },
    { id: 7, name: 'RubberMan' },
    { id: 8, name: 'Dynama' },
  ];

  let heroStub = {
    delete: (hero: Hero): Observable<Hero[]> => {
      const newHeroes = mockHero.filter(h => h !== hero);
      return of(newHeroes);
    },

    getHeroes: (): Observable<Hero[]> => {
      return of(mockHero);
    },

    getHero: (id: number): Observable<Hero> => {
      const hero = mockHero.find(h => h.id === id);
      // if hero not found return a error observable with 404 status
      return hero ? of(hero) : throwError(new Error(`Hero with id ${id} not `))
    },

    save(hero: Hero): Observable<Hero> {
      if (hero.id) {
        return this.put(hero);
      }
      return this.post(hero);
    },

    put: (hero: Hero): Observable<Hero> => {
      mockHero = mockHero.map(h => (h.id === hero.id ? hero : h));
      return of(hero);
    },

    post: (hero: Hero): Observable<Hero> => {
      const newHero = { ...hero, id: mockHero.length + 1 };
      mockHero.push(newHero);
      return of(newHero);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HeroService,
        useValue: heroStub
      }]
    });
    service = TestBed.inject(HeroService);
    http = TestBed.inject(HttpClient);
  });

  it('deve ser injetado', () => {
    expect(service).toBeTruthy();
  });

  describe('delete', () => {

    it('Testar se um heroi foi excluido', () => {
      const heros = mockHero;
      const herosLength = mockHero.length;

      const removeHero = heros[0];

      service.delete(removeHero).subscribe(res => {
        expect(res.length).toEqual(herosLength - 1);
      });
    });

    it('Testar se foi excluido o heroi correto', () => {
      const heros = mockHero;
      const removeHero = heros[0];
      const newHeros = heros.filter(h => h !== removeHero);

      service.delete(removeHero).subscribe(res => {
        expect(res).toEqual(newHeros);
      });
    });
  });

  describe('post', () => {
    it("Testar se um heroi foi criado", () => {
      const hero = { id: mockHero.length + 1, name: "Flash" };

      service.save(hero).subscribe(res => {
        expect(res).toEqual(hero);
      });
    });
  });
});
