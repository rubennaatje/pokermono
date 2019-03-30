import { Injectable } from '@angular/core';
import { Adapter } from './abstract/adapter';
import { Pokemon } from '../models/pokemon';

@Injectable({
    providedIn: 'root'
})
export class PokemonAdapter implements Adapter<Pokemon> {

  adapt(item: any): Pokemon {
    console.log(item);
    return new Pokemon(
        item.id,
        item.name,
        item.url,
        item.description[1],
        [{}]
    );
  }
}