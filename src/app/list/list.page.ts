import { Component, OnInit } from '@angular/core';
import { Pokemon} from '../models/pokemon';
import { POKEMON } from '../mock-pokemon';
import { PokemonService } from '../services/pokemon.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Species } from '../models/species';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  pokemons = POKEMON;
  listOfPokemon: Species[];

  constructor(private pokemonService: PokemonService) {

  }

  ngOnInit() {
    this.pokemonService.getSpecies().subscribe(result => this.listOfPokemon = result);    
  }

}
