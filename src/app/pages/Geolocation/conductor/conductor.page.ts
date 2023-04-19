import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Viaje } from 'app/models/models';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';
import { HistorialPage } from '../historial/historial.page';
import { IndicacionesPage } from '../indicaciones/indicaciones.page';

declare var google;
let marker;
let watchID;
let geoLoc;
let map;
let options;
let estado2: boolean;
var lista = [];

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
  uid: string = null;

  sourceLocation = localStorage.getItem('rutaInicio');
  destinationLocation = localStorage.getItem('rutaLlegada');

  lugares = {
    a: this.sourceLocation,
    b: this.destinationLocation,
  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  lat: number;
  lng: number;
  estado = false;
  disabled = true;
  clase = 'ion-hide';
  clase2 = '';
  clase3 = 'false';
  clase4 = 'true';
  idDocHistorial = '';
  listaHistorial = [];

  today: number = Date.now();

  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    public task: HistorialPage,
    private firestore: FirestoreService,
    private interaction: UiServiceService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getUid();
    this.hide();
  }


  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
    }
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    const myLatLng = { lat: 3.440018, lng: -76.519073 };
    map = new google.maps.Map(mapEle, {
      center: '',
      zoom: 12,
    });
    this.directionsDisplay.setMap(map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateAndDisplayRoute();
    });

    const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      ///icon: image
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

  isEmpty() { 
    return this.sourceLocation == null || this.destinationLocation == null
      ? false
      : true;
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
      options = { setTimeout: 30000 };
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
    const myLatLng = { lat: latitud, lng: longitud };
    
    if (estado2) {
      lista.push(myLatLng);
    }
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

  async iniciarViaje() {

    if (this.isEmpty()) {
      this.clase3 = 'false';
      this.clase4 = 'false';
      this.loadMap();
      await this.firestore.delete('Solicitudes', this.uid);
      localStorage.removeItem('rutaInicio');
      localStorage.removeItem('rutaLlegada');
      this.clase3 = 'true';
      estado2=true;
      this.task.addTask(this.sourceLocation, this.destinationLocation);
      this.hide();
      this.getUserLocation();
    } else {
      this.interaction.alertaInformativa('Los campos no pueden estar vacios');
    }
  }

  unique(arr){
    let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
  }

  finalizarViaje() {
    this.firestore.consultarIdHistorial(this.uid, this.sourceLocation, this.destinationLocation).then((firebaseResponse)=>{
      firebaseResponse.subscribe((listaFirebaseRef) =>{
        this.listaHistorial = listaFirebaseRef.map((historialRef) =>{
          this.idDocHistorial = historialRef.payload.doc.id;
          this.firestore.update(historial, 'Historial', this.idDocHistorial);
        })
      })
    })

    var historial = {
      uid: this.uid,
      inicio: this.sourceLocation,
      llegada: this.destinationLocation,
      fecha: this.today,
      estado: true
    }

    var viaje: Viaje = {
      uid: this.uid,
      inicio: this.sourceLocation,
      llegada: this.destinationLocation,
      coordenada: this.unique(lista)
    }
    estado2 = false;
    this.firestore.coord(viaje, 'Viajes', this.uid);
    lista.splice(0, lista.length);
    clearTimeout(options);
  }
}
