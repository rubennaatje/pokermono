import { Component, OnInit, ViewChild  } from '@angular/core';
import { Pokemon} from '../../models/pokemon';
import { POKEMON } from '../../mock-pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Species } from '../../models/species';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  pokemons: Species[];
  FullListOfPokemon: Species[];
  fakeListOfPokemon: Array<any> = new Array(15);
  // pokemonShown = 15;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private pokemonService: PokemonService) {

  }

  ngOnInit() {
    this.pokemonService.getSpecies().subscribe(result => this.setFullListOfPokemon(result));
  }

  setFullListOfPokemon(result: Species[]){
    this.FullListOfPokemon = result;
    this.pokemons = this.FullListOfPokemon.slice(0, 15);
  }

  loadData(event) {
    var newData = this.FullListOfPokemon.slice(0, this.pokemons.length + 15);
    // this.pokemons.concat(newData);
    this.pokemons = newData;
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.pokemons.length >= this.FullListOfPokemon.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
