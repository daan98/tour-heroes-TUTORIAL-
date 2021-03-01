import { Injectable, ErrorHandler } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesURL = 'api/heroes'; //WEB API URL
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    //GETTING DATA FROM SERVER
    return this.http.get<Hero[]>(this.heroesURL).pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError<Hero[]>('getHeroes', [])));
    
    //GETTING DATA FROM MOCK
    /* const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes')
    return heroes; */
  }

  getHeroNo404<Data>(id: number): Observable<Hero>{
    const url = `${this.heroesURL}/?id=${id}`;
    return this.http.get<Hero[]>(url).pipe(
      map(heroes => heroes[0]),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id: ${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id: ${id}`))
    )
  }

  // IF ID DO NOT MATCH ANY REGISTER, THE METHOD WILL SEND 404 ERROR
  getHero(id: number): Observable<Hero>{
    //GETTING DATA FROM SERVER
    const url = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id: ${id}`),
      catchError(this.handleError<Hero>(`getHero id: ${id}`))
      ));
    
    //GETTING DATA FROM MOCK
    /* this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find( hero => hero.id === id)); */
  }

  searchHeroes (term: string): Observable<Hero[]>{

    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesURL}/?alterEgo=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found heroes matching ${term}`) :
        this.log(`No heroes matching ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

    
  }

  private log(message: string){
    this.messageService.add(`Hero Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error); //SEND ERROR TO REMOTE LOGGING

      this.log(`${operation} failed: ${error.message}`); //PRINT ERROR TO USER

      return of(result as T); //KEEPING THE APP RUNNING BY SENDING EMPTY RESULT (IF NECESSARY)
    }
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesURL, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id: ${hero.id}`)), catchError(this.handleError<any>(`Updated hero`)));
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesURL, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added Hero w/ id: ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesURL}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => `deleted hero id: ${id}`),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}