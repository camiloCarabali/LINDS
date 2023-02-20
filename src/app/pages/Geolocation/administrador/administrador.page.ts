import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { Usuario } from 'app/models/models';
import { Viaje } from 'app/models/models';
import { data } from 'jquery';

declare var google;
let map;
let marker;

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  today: number = Date.now();

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  lista = [];
  cadenaId: string;
  listaId = [];
  nombres = [];
  result = [];
  result2 = [];
  viaje: string;
  public coord = [];
  public to: string;
  public from: string;

  constructor(private firestore: FirestoreService, private auth: AuthService) {}

  ngOnInit() {
    this.getUid();
  }

  loadMap(to, from, coord) {
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
      this.calculateAndDisplayRoute(to, from);
    });
    /*
    marker = new google.maps.Marker({
      position: this.coord[0],
      map: map,
    });
*/
  }

  calculateAndDisplayRoute(to, from) {
    this.directionsService
      .route({
        origin: {
          query: to,
        },
        destination: {
          query: from,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        this.directionsDisplay.setDirections(response);
      });
  }

  async getUid() {
    const uid = await this.auth.getUid();
    this.getInfoUser(uid);
  }

  async buscarViaje(id: string) {
    this.firestore.getDoc<Viaje>('Viajes', id.trim()).subscribe((res) => {
      if (res) {
        this.to = res.inicio;
        this.from = res.llegada;
        this.coord = res.coordenada;
        this.loadMap(this.to, this.from, this.coord);
      }
    });
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
      console.log(this.result2);
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
}
