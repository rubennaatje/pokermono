import { Injectable } from '@angular/core';
import { Adapter } from './abstract/adapter';
import { Species } from '../models/species';

@Injectable({
    providedIn: 'root'
})

export class SpeciesAdapter implements Adapter<Species> {

    adapt(item: any): Species {
        return new Species(
            item.entry_number,
            item.pokemon_species.name,
            item.pokemon_species.url,
        );
    }
}