import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { Usuario } from 'app/models/models';
import { IonButton } from '@ionic/angular';

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
  historiales = [];
  historialesId = [];
  dataHistorial = [];
  viaje: string;
  public coord = [];
  public to: string;
  public from: string;
  public viajeHistorial = { inicio: '', llegada: '' };

  constructor(private firestore: FirestoreService, private auth: AuthService) {}

  ngOnInit() {
    this.getUid();
  }

  unique(array) {
    const valores = new Set(array);
    let result = [...valores];
    return result;
  }

  loadMap(to, from, coord?) {
    this.unique(coord);
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
      this.calculateAndDisplayRoute(to, from, coord);
    });
  }

  calculateAndDisplayRoute(to, from, coord) {
    this.directionsService
      .route({
        origin: to,
        destination: from,
        //waypoints: this.unique(coord),
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        this.directionsDisplay.setDirections(response);
      });
  }

  async cargarHistorial(uid) {
    this.historialesId.splice(0, this.historialesId.length);
    this.dataHistorial.splice(0, this.dataHistorial.length);
    this.firestore.showHistorial(uid).then((firebaseResponse) => {
      firebaseResponse.subscribe((historialesRef) => {
        this.historiales = historialesRef.map((historialRef) => {
          this.historialesId.push(historialRef.payload.doc.id);
          this.dataHistorial.push(historialRef.payload.doc.data());
        });
      });
    });
  }

  async getUid() {
    const uid = await this.auth.getUid();
    this.getInfoUser(uid);
  }

  async mostrarViaje(historial) {
    this.viajeHistorial.inicio = historial.inicio;
    this.viajeHistorial.llegada = historial.llegada;
    this.loadMap(this.viajeHistorial.inicio, this.viajeHistorial.llegada);
  }

  async buscarViaje(id: string) {
    this.cargarHistorial(id);
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
}
