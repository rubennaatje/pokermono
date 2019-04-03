import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon';
import { PokemonStorageService } from '../services/pokemon-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-species',
  templateUrl: './species.page.html',
  styleUrls: ['./species.page.scss'],
})
export class SpeciesPage implements OnInit {

  id: number;
  selectedPokemon: Pokemon;
  public possibleFlavorTexts: string[];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pokemonService: PokemonService,
    private storageService: PokemonStorageService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(this.id).subscribe(result => this.setPokemon(result));

  }

  setPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    this.possibleFlavorTexts = [];
    this.selectedPokemon.flavor_text_entries.forEach(function(entry) {
      if (entry['language'].name === 'en') {
        console.log(this);
       this.possibleFlavorTexts.push(entry['flavor_text']);
      }
    }, this);
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
