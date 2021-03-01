import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'; // ALLOW TO GO BACK TO THE VIEW THAT NAVIGATED HERE
import { ActivatedRoute, RouterModule } from '@angular/router';// ALLOW THE APP TO READ URL INFORMATION (IN THIS CASE, THE ID)

import { Hero } from '../hero';
import { HeroService } from '../hero.service';// THE APP OBTAIN HERO INFORMATION FROM THE SERVER AND DISPLAY IT


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  
  constructor(private heroService:HeroService, private location:Location, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(){
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
