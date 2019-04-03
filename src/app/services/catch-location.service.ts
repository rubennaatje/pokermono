import { Injectable } from '@angular/core';
import { CatchLocation } from '../models/catch-location';
import { PokemonService } from './pokemon.service';
import { PokemonStorageService } from './pokemon-storage.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CatchLocationService {
  locations: CatchLocation[];
  constructor(
    private pokemonService: PokemonService,
    private pokemonStorageService: PokemonStorageService,
    private vibration: Vibration,
    private toastController: ToastController,
    ) { }

  generateLocations( lat: number, long: number) {

    if (this.locations === undefined || this.locations.length <= 5) {

      this.locations = new Array(10);

      const minLat = lat - 0.001;
      const maxLat = lat + 0.001;

      const minLong = long - 0.001;
      const maxLong = long + 0.001;

      for (let i = 0; i < 10; i++) {
        const newLat = Math.random() * (maxLat - minLat) + minLat;
        const newLong = Math.random() * (maxLong - minLong) + minLong;
        const randomId = Math.floor(Math.random() * (71) + 1);
        this.locations[i] = new CatchLocation(newLat, newLong);
        this.pokemonService.getPokemon(randomId).subscribe(pokemon => this.locations[i].pokemon = pokemon);
      }

    }
  }

  getAlLocations() {
    console.log(this.locations);
    return this.locations;
  }

  checkCatch(latlon: { lat: number; lng: number; }) {
    if (this.locations !== undefined || this.locations.length <= 5) {
      for (let i = 0; i < this.locations.length; i++) {
        const e = this.locations[i];
        const distance = this.getDistanceFromLatLonInKm(latlon.lat, latlon.lng, e.lat, e.long);
        console.log(distance + ' ' + e.pokemon.name);
        if (distance < 0.11) {
          console.log('Catched!');
          this.vibration.vibrate(1000);
          this.pokemonStorageService.addItem(e.pokemon);
          this.locations.splice(i, 1);
          this.showToast('Catched ' + e.pokemon.name + '!');
        }
      }
    } else {
      this.generateLocations(latlon.lat, latlon.lng);
    }
  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in KM
    return d;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
