import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private urlHeroes = "http://localhost:8080/herorestapi_war_exploded/api/heroes";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.urlHeroes);  // prende i dati dalla chiamata rest
  }

  getHeroesNotObservable(): Hero[] {  
    return HEROES;
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.urlHeroes}/${id}`;
    return this.http.get<Hero>(url);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.urlHeroes, hero, this.httpOptions);
  }

  delete(hero: number): Observable<Hero> {
    return this.http.delete<Hero>(`${this.urlHeroes}/${hero}`, this.httpOptions);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) { //if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.urlHeroes}/search/?name=${term}`);
  }



}