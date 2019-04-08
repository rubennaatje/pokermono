import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer/ngx';

import leaflet from 'leaflet';
import { Observable } from 'rxjs';
import { CatchLocationService } from 'src/app/services/catch-location.service';
import { ChangeDetectorRef } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
  catchCircles: any[];
  catchImages: any[];
  steps: number;
  distance: number;
  constructor(
    private pedometer: Pedometer,
    private catchLocationService: CatchLocationService,
    private changeRef: ChangeDetectorRef,
    private geolocation: Geolocation
    ) { }

  ngOnInit() {
      this.pedometer.isDistanceAvailable()
      .then((available: boolean) => console.log(available))
      .catch((error: any) => console.log(error));

      this.pedometer.startPedometerUpdates()
      .subscribe((data: IPedometerData) => {
        console.log(data);
        this.steps = data.numberOfSteps;
        this.distance = data.distance;
        this.changeRef.detectChanges();
      });
      this.catchCircles = [];
      this.catchImages = [];

      this.geolocation.getCurrentPosition().then(
        e => {
          this.catchLocationService.generateLocations(e.coords.latitude, e.coords.longitude);
        }
      );
  }

  ionViewDidEnter() {
    if (!this.map) {
      this.loadmap();
    }
  }

  loadmap() {

    if (this.map) {
      this.map.remove();
    }

    this.map = leaflet.map('map', {zoomControl: false }).setView([51.6886659, 5.2869727    ], 13);

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
    };

    const circleOptionsRadius = {
      fillOpacity: 0.07,
      opacity: 0.15
    };

    this.playerCircle = leaflet.circle([51.6978162, 5.3036748], 3, circleOptionsPlayer);
    this.accuracyCircle = leaflet.circle([51.6978162, 5.3036748], 10, circleOptionsRadius).addTo(this.map);
    this.playerCircle.addTo(this.map);

    this.map.on('locationfound', (e: any) => {this.onLocationFound(e); });
  }

  onLocationFound(e) {

    console.log('location found');
    const radius = e.accuracy / 2;

    this.catchLocationService.checkCatch(e.latlng);
    this.playerCircle.setLatLng(e.latlng);
    this.accuracyCircle.setLatLng(e.latlng);
    this.accuracyCircle.setRadius(radius);

    // this.map.panTo(e.latlng);
    this.catchCircles.forEach(element => {
      this.map.removeLayer(element);
    });
    this.catchImages.forEach(element => {
      this.map.removeLayer(element);
    });
    const locations = this.catchLocationService.getAlLocations();
    if (locations !== undefined) {
        locations.forEach(element => {
          const circleOptionsCatchRadius = {
            fillOpacity: 0.15,
            opacity: 0.35,
            fillColor: 'green',
            color: 'green'
          };
          if (element.pokemon !== undefined) {
            this.catchCircles.push(leaflet.circle([element.lat, element.long], 100, circleOptionsCatchRadius).addTo(this.map));

            const imageBounds = [[element.lat - 0.001, element.long - 0.0015], [element.lat + 0.001, element.long + 0.0015]];
            this.catchImages.push(leaflet.imageOverlay('/assets/pokemon/' + element.pokemon.id + '.png', imageBounds).addTo(this.map));
            leaflet.imageOverlay('/assets/pokemon/' + element.pokemon.id + '.png', imageBounds).bringToFront();
          }
      });
    }
  }

}
