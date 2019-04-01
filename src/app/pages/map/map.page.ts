import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import leaflet from 'leaflet';
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
  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadmap();
  }
 
  loadmap() {
    this.map = leaflet.map("map").setView([51.6978162, 5.3036748], 13);
    
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 20,
      minZoom:5,
      keepInView: true,
      dragging: false
    }).addTo(this.map);
    
    this.map.locate({setView: true, maxZoom: 16, watch: true});
    
    var mondayLayer = leaflet.geoJSON()

    this.map.on('locationfound',(e)=> {this.onLocationFound(e)});
  }

  onLocationFound(e) {
    var radius = e.accuracy / 2;
    
    var circleOptionsPlayer = {
          color: 'red',
          fillColor: 'red',
          fillOpacity: 100
    }

    var circleOptionsRadius = {
      fillOpacity: 0.07,
      opacity: 0.15
    }

    this.playerCircle = leaflet.circle(e.latlng, 3,circleOptionsPlayer);
    this.playerCircle.addTo(this.map);
    // this.map.remove(this.playerCircle);
    leaflet.circle(e.latlng, radius,circleOptionsRadius).addTo(this.map);

    // this.map.mondayLayer.remove(this.playerCircle)

    this.map.panTo(e.latlng);
  }

}

