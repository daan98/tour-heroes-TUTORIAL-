import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  // CODE LINES USEFUL BEFORE ROUTERLINK IMPLEMENTATION
  /*onSelect(hero:Hero): void{
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id= ${hero.id}`);
  }*/

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, lastName: string, alterEgo:string): void {
    name = name.trim();
    lastName = lastName.trim();
    alterEgo = alterEgo.trim();

    if(!name || !lastName || !alterEgo || (!name && !lastName && !alterEgo)){
      return;
    }

    this.heroService.addHero({name, lastName, alterEgo} as Hero).subscribe(hero => { this.heroes.push(hero); });
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter( h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
