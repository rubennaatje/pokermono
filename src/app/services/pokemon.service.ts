import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';

import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { PokemonAdapter } from '../adapters/pokemonadapter';
import { Species } from '../models/species';
import { SpeciesAdapter } from '../adapters/speciesadapter';





@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  apiurl: string;

  constructor(private http: HttpClient, private pokemonAdapter: PokemonAdapter, private speciesAdapter: SpeciesAdapter) { 
    this.apiurl = "https://pokeapi.co/api/v2/"
  }

  /** GET heroes from the server */
  getSpecies (): Observable<Species[]> {
    return this.http.get(this.apiurl + 'pokedex/1/').pipe(
      map(
        (data: any[]) => data['pokemon_entries'].map((item: any) => this.speciesAdapter.adapt(item))
      )
    );
  }

  getPokemon(id: number) : Observable<Pokemon>{
    return this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon-species/'+id+'/');
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
