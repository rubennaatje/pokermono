import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { PokemonStorageService } from '../services/pokemon-storage.service';
import { Pokemon } from '../models/pokemon';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Pokemon[] = [];

  newItem: Pokemon = <Pokemon>{};
  @ViewChild('mylist')mylist: IonList;
  constructor(
    private storageService: PokemonStorageService,
    private plt: Platform,
    private toastController: ToastController,
    private socialSharing: SocialSharing
    ) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }


  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

    deleteItem(item: Pokemon) {
      this.storageService.deleteItem(item.id).then(item => {
        this.showToast( item.name + ' removed!');
        this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
        this.loadItems(); // Or splice it from the array directly
      });
    }

    sharePokemon(selectedPokemon: Pokemon) {
      this.socialSharing.share('I just got a ' + selectedPokemon.name + '! Got to get all of them! POKERMONO LEAVE!');
    }

    // Helper
    async showToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

}
