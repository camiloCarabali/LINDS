import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Viaje } from 'app/models/models';
import { FirestoreService } from 'app/services/firestore.service';
import { HistorialPage } from '../../historial/historial.page';
import { IndicacionesPage } from '../../indicaciones/indicaciones.page';

declare var google;
let marker;
let watchID;
let geoLoc;
let map;
let options;
let estado2: boolean;
var lista = []

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  sourceLocation = '';
  destinationLocation = '';

  lugares = {
    a: this.sourceLocation,
    b: this.destinationLocation,
  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  lat: number;
  lng: number;
  estado = false;
  clase = 'ion-hide';
  clase2 = '';
  

  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    public task: HistorialPage,
    private firestore: FirestoreService
  ) {}

  ngOnInit(): void {
    this.hide();
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
    this.hide();
  }

  hide() {
    if (this.estado == true) {
      this.clase = '';
      this.clase2 = 'ion-hide';
      this.estado = false;
    } else {
      this.clase = 'ion-hide';
      this.clase2 = '';
      this.estado = true;
    }
  }

  getUserLocation() {
    if (navigator.geolocation) {
      geoLoc = navigator.geolocation;
      options = { setTimeout: 10000 };
      watchID = geoLoc.watchPosition(
        this.showLocationOnMap,
        this.errorHandler,
        options
      );
    }
  }
/*
  saveCoords(latitud, longitud){
    console.log("a");
    
    const viaje: Viaje = {
      id: '001',
      coordenada: {
        latitud: latitud,
        longitud: longitud
      }
    };
    this.firestore.coord(viaje, 'Viajes', 'ejemplo');
  }
*/
  showLocationOnMap(position) {
    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude;
    if (estado2) {
      
      var viaje: Viaje = {
        id: '001',
        coordenada: {
          latitud: latitud,
          longitud: longitud
        }
      };
      lista.push(viaje);
      console.log('Latitud: ' + latitud + ' Longitud: ' + longitud);
    }
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

  async showModalIndicators(a, b) {
    const modal = await this.modalCtrl.create({
      component: IndicacionesPage,
      componentProps: {
        a: a,
        b: b,
      },
    });
    return await modal.present();
  }

  iniciarViaje() {
    estado2 = true;
    this.task.addTask(this.sourceLocation, this.destinationLocation);
    this.loadMap();
  }

  finalizarViaje() {
    estado2 = false;
    console.log('TERMINO');
    const object = Object.assign({}, lista);
    this.firestore.coord(object, 'Viajes', 'ejemplo2');
    lista.splice(0, lista.length);
    clearTimeout(options);
  }
}
