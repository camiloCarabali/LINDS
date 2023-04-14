import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { Usuario } from 'app/models/models';
import { UiServiceService } from 'app/services/ui-service.service';
import { Router } from '@angular/router';

declare var google;
let marker;
let watchID;
let geoLoc;
let map;

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {
  lugarSalida = '';
  lugarDestino = '';
  lista = [];
  cadenaId: string;
  listaId = [];
  nombres = [];
  result = [];
  result2 = [];
  viaje: string;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  lat: number;
  lng: number;

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService,
    private interacion: UiServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUid();
  }

  async getUid() {
    const uid = await this.auth.getUid();
    this.getInfoUser(uid);
  }

  getNameUser(uid) {
    const path = 'Usuarios';
    const id = uid;
    let nombres = '';
    this.firestore.getDoc<Usuario>(path, id).subscribe((res) => {
      if (res) {
        nombres = res.nombre;
        this.nombres.push(nombres);
      }
      this.result2 = this.nombres.filter((item, index) => {
        return this.nombres.indexOf(item) === index;
      });
    });
  }

  async buscarConductor(sucursal) {
    this.firestore.searchConductor(sucursal).then((firebaseResponse) => {
      firebaseResponse.subscribe((usuariosRef) => {
        this.lista = usuariosRef.map((usuarioRef) => {
          this.listaId.push(usuarioRef.payload.doc.id);
          this.result = this.listaId.filter((item, index) => {
            return this.listaId.indexOf(item) === index;
          });
        });
        for (let i = 0; i < this.result.length; i++) {
          this.getNameUser(this.result[i]);
        }
      });
    });
  }

  getInfoUser(uid) {
    const path = 'Usuarios';
    const id = uid;
    let sucursal = '';
    this.firestore.getDoc<Usuario>(path, id).subscribe((res) => {
      if (res) {
        sucursal = res.sucursal;
        this.buscarConductor(sucursal);
      }
    });
  }

  asignarViaje(uid) {
    var viaje = {
      uid: uid,
      inicio: this.lugarSalida,
      llegada: this.lugarDestino,
    };
    this.firestore.createHistorial(viaje, 'Historial');
    this.firestore.createViaje(viaje, 'Solicitudes', uid);
    if (this.lugarSalida != '' && this.lugarDestino != '') {
      this.interacion.presentToast('Asignación realizada correctamente');
      this.lugarSalida = '';
      this.lugarDestino = '';
      this.router.navigate(['/perfil']);
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

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
  }

  calculateAndDisplayRoute() {
    this.directionsService
      .route({
        origin: {
          query: this.lugarSalida,
        },
        destination: {
          query: this.lugarDestino,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        this.directionsDisplay.setDirections(response);
      });
  }

  crearViaje() {
    this.loadMap();
  }
}
