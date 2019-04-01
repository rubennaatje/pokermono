import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { PokemonStorageService } from '../services/pokemon-storage.service';
import { Pokemon } from '../models/pokemon';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Pokemon[] = [];
 
  newItem: Pokemon = <Pokemon>{};
  @ViewChild('mylist')mylist: IonList;
  constructor(private storageService: PokemonStorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  } 
  
  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }
   
    // DELETE
    deleteItem(item: Pokemon) {
      this.storageService.deleteItem(item.id).then(item => {
        this.showToast('Item removed!');
        this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
        this.loadItems(); // Or splice it from the array directly
      });
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
