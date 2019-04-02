import { Pokemon } from './pokemon';

export class CatchLocation {
    public pokemon: Pokemon;
    constructor(public lat: number, public long: number) {}
}
