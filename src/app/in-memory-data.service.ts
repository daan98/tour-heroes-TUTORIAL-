import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
    const heroes = [
      {id:10, name:'Bruce', lastName:'Wayne', alterEgo:'Batman'},
      {id:12, name:'Diana', lastName:'Prince', alterEgo:'Wonder Woman'},
      {id:13, name:'John', lastName:'Stewart', alterEgo:'Green Lantern'},
      {id:14, name:'Clark', lastName:'Kent', alterEgo:'Super-Man'},
      {id:15, name:'Barry', lastName:'Allen', alterEgo:'Flash'},
      {id:16, name:'Bruce', lastName:'Banner', alterEgo:'Hulk'},
      {id:17, name:'Peter', lastName:'Parker', alterEgo:'Spider-Man'},
      {id:18, name:'James', lastName:'Howlett', alterEgo:'Wolverine'},
      {id:19, name:'Victor', lastName:'Stone', alterEgo:'Cyborg'},
      {id:20, name:'Athur', lastName:'Curry', alterEgo:'Aquaman'}
    ];

    return {heroes};
  }

  /* ENSURING THAT A HERO ALWAYS HAS AN ID. IF THE HEROES ARRAY IS EMPTY THE METHOD RETURNS INITIAL ID (11), IS NOT IT RETURN
     THE HIGHEST ID (hero.id + 1)*/
  genId(heroes: Hero[]): number{
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
