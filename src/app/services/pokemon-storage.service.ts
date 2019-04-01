import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Storage} from '@ionic/storage';
const ITEMS_KEY = 'pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonStorageService {
  constructor(private storage: Storage) { }

  // CREATE
  addItem(item: Pokemon): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Pokemon[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // READ
  getItems(): Promise<Pokemon[]> {
    return this.storage.get(ITEMS_KEY);
  }

  // UPDATE
  updateItem(item: Pokemon): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Pokemon[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let newItems: Pokemon[] = [];

      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  // DELETE
  deleteItem(id: number): Promise<Pokemon> {
    return this.storage.get(ITEMS_KEY).then((items: Pokemon[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Pokemon[] = [];

      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
