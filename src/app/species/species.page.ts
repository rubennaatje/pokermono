import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-species',
  templateUrl: './species.page.html',
  styleUrls: ['./species.page.scss'],
})
export class SpeciesPage implements OnInit {

  id: number;
  selectedPokemon: Pokemon;
  constructor(  private route: ActivatedRoute,private location: Location, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(this.id).subscribe(result => this.selectedPokemon = result);
  }

}
