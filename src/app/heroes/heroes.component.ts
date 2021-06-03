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

  //selectedHero?: Hero; // ? significache e' opzionale valorizzarlo

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
    console.log(this.heroes);
  }

  getHeroes(): void {  
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();  // rimuovo gli spazi dalla stringa
    if (!name) {  // se e' nullo non fare nulla
      return;
    }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero)); // aggiungi l'eroe alla lista per poi stamparlo
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(hero => hero !== hero);
    this.heroService.delete(hero.id).subscribe();
  }
  
}