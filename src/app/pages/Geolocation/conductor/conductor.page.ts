import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
  sourceLocation = '';
  destinationLocation = '';

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  lat: number;
  lng: number;

  constructor() {}

  ngOnInit(): void {
    this.loadMap();
    this.getUserLocation();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    this.map = new google.maps.Map(mapEle, {
      center: { lat: 3.374653, lng: -76.514308 },
      zoom: 12,
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateAndDisplayRoute();
    });
  }

  calculateAndDisplayRoute() {
    this.directionsService
      .route({
        origin: {
          query: this.sourceLocation,
        },
        destination: {
          query: this.destinationLocation,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        this.directionsDisplay.setDirections(response);
      });
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.loadMap();
        this.addMarker(this.lat, this.lng);
      });
    }
  }

  addMarker(x, y) {
    return new google.maps.Marker({
      position: {
        lat: x,
        lng: y,
      },
      map: this.map,
      title: 'ubicacion',
    });
  }
}
