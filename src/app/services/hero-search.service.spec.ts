import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HeroSearchService } from './hero-search.service';
import { Observable, of } from 'rxjs';
import { Hero } from '../api/hero';

describe('HeroSearchService', () => {
  let service: HeroSearchService;

  const mockHero: Hero[] = [{ id: 1, name: 'Superman' }];

  const heroSearchStub = {
    search: (term: string): Observable<Hero[]> => {
      const heroes = mockHero.filter(hero => hero.name === term);
      return of(heroes);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HeroSearchService,
          useValue: heroSearchStub
        }
      ]
    });
    service = TestBed.inject(HeroSearchService);
  });

  it('deve ser injetado', () => {
    expect(service).toBeTruthy();
  });

  it('search() deve retornar o hero esperado', () => {
    const term = 'Superman';
    const expectedHeroes = mockHero.filter(hero => hero.name === term);

    service.search(term).subscribe(heroes => {
      expect(heroes).toEqual(expectedHeroes);
    });

  });

});
