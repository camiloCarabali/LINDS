import { Component, ErrorHandler, OnInit } from '@angular/core';

declare var google;
let marker;
let watchID;
let geoLoc;
let map;

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
  sourceLocation = '';
  destinationLocation = '';

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  lat: number;
  lng: number;

  constructor() {}

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    const myLatLng = { lat: 3.374653, lng: -76.514308 };
    map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12,
    });

    this.directionsDisplay.setMap(map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateAndDisplayRoute();
    });

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
    this.getUserLocation();
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
      var options = { setTimeout: 5000 };
      geoLoc = navigator.geolocation;
      watchID = geoLoc.watchPosition(
        this.showLocationOnMap,
        this.errorHandler,
        options
      );
    }
  }

  showLocationOnMap(position) {
    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude;
    console.log('Latitud: ' + latitud + ' Longitud: ' + longitud);
    const myLatLng = { lat: latitud, lng: longitud };
    marker.setPosition(myLatLng);
    map.setCenter(myLatLng);
  }

  errorHandler(err) {
    if (err.code == 1) {
      alert('Error Acceso denegado');
    } else if (err.code == 2) {
      alert('Error: position no existe o no se encuentra');
    }
  }
}
