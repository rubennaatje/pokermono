import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer/ngx';

import leaflet from 'leaflet';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  playerCircle: any;
  accuracyCircle: any;
  steps: number;
  constructor(private pedometer: Pedometer) { }

  ngOnInit() {
    this.pedometer.isDistanceAvailable()
  .then((available: boolean) => console.log(available))
  .catch((error: any) => console.log(error));

  this.pedometer.startPedometerUpdates()
   .subscribe((data: IPedometerData) => {
     console.log(data);
     this.steps = data.numberOfSteps;
   });
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {

    if (this.map) {
      this.map.remove();
    }

    this.map = leaflet.map('map', {zoomControl: false }).setView([51.6978162, 5.3036748], 13);

    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 20,
      minZoom: 5,
      keepInView: true,
      dragging: false
    }).addTo(this.map);

    this.map.locate({setView: true, maxZoom: 16, watch: true});

    const circleOptionsPlayer = {
      color: 'red',
      fillColor: 'red',
      fillOpacity: 100
    }
    const circleOptionsRadius = {
      fillOpacity: 0.07,
      opacity: 0.15
    }



    this.playerCircle = leaflet.circle([51.6978162, 5.3036748], 3, circleOptionsPlayer);
    this.accuracyCircle = leaflet.circle([51.6978162, 5.3036748], 10, circleOptionsRadius).addTo(this.map);
    this.playerCircle.addTo(this.map);

    this.map.on('locationfound', (e: any) => {this.onLocationFound(e)});
  }

  onLocationFound(e) {
    const radius = e.accuracy / 2;


    this.playerCircle.setLatLng(e.latlng);
    this.accuracyCircle.setLatLng(e.latlng);
    this.accuracyCircle.setRadius(radius);

    this.map.panTo(e.latlng);
  }

}
