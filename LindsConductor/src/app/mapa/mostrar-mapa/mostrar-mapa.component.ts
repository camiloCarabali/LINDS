import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SharedService } from 'src/services/shared.service';
import { UiService } from 'src/services/ui.service';

declare var google: any;
let marker: any;
let watchID;
let geoLoc;
let map: any;

@Component({
  selector: 'app-mostrar-mapa',
  templateUrl: './mostrar-mapa.component.html',
  styleUrls: ['./mostrar-mapa.component.scss'],
})
export class MostrarMapaComponent implements OnInit {
  isModalOpen = false;

  class_inicio = '';
  class_fin = 'ion-hide';

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen1 = false;

  setOpen1(isOpen: boolean) {
    this.isModalOpen1 = isOpen;
  }

  modalTitle: string = '';
  Activate_Indicaciones_MapaComp: boolean = false;
  Activate_Entregas_MapaComp: boolean = false;

  sourceLocation = localStorage.getItem('rutaInicio');
  destinationLocation = localStorage.getItem('rutaLlegada');
  waypoints: any = [];

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private interaction: UiService,
    public menuCtrl: MenuController,
    private service: SharedService
  ) {}

  ngOnInit() {
    this.ionViewDidEnter();
    this.sourceLocation = localStorage.getItem('rutaInicio');
    this.destinationLocation = localStorage.getItem('rutaLlegada');
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  loadMap() {
    const mapEle = document.getElementById('map') as HTMLElement;
    const myLatLng = { lat: 3.440018, lng: -76.519073 };
    map = new google.maps.Map(mapEle, {
      center: {
        query: this.sourceLocation,
      },
      zoom: 12,
    });

    this.directionsDisplay.setMap(map);

    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
    this.getPosition();
  }

  getPosition() {
    if (navigator.geolocation) {
      var options = { enableHighAccuracy: true, timeout: 10000 };
      geoLoc = navigator.geolocation;
      watchID = geoLoc.watchPosition(
        this.showLocationOnMap,
        this.errorHandler,
        options
      );
    }
  }

  showLocationOnMap(position: any) {
    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude;

    const myLatLng = { lat: latitud, lng: longitud };
    marker.setPosition(myLatLng);
    map.setCenter(myLatLng);
  }

  errorHandler(err: any) {
    if (err.code == 1) {
      alert('Error Acceso denegado');
    } else if (err.code == 2) {
      alert('Error: position no existe o no se encuentra');
    }
  }

  private calculateRoute() {
    const puntosEntrega: string = localStorage.getItem('waypoints')!;
    this.waypoints = JSON.parse(puntosEntrega);
    this.directionsService
      .route({
        origin: {
          query: this.sourceLocation,
        },
        destination: {
          query: this.destinationLocation,
        },
        waypoints: this.waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response: any) => {
        this.directionsDisplay.setDirections(response);
      });
  }

  iniciarViaje() {
    this.service
      .enviadoMercancia(localStorage.getItem('id'))
      .subscribe((data) => {});
    this.service
      .inicioViaje(localStorage.getItem('id'))
      .subscribe((data) => {});

    this.class_inicio = 'ion-hide';
    this.class_fin = '';
    this.sourceLocation = localStorage.getItem('rutaInicio');
    this.destinationLocation = localStorage.getItem('rutaLlegada');
    this.loadMap();
  }

  finalizarViaje() {
    this.ionViewWillLeave();
    this.interaction.presentDecisionAlert(
      'Estas seguro que quieres finalizar el viaje?'
    );
  }

  indicaciones() {
    this.setOpen(true);
    this.modalTitle = 'Indicaciones';
    this.Activate_Indicaciones_MapaComp = true;
  }

  entregas() {
    this.setOpen1(true);
    this.modalTitle = 'Puntos de Entregas';
    this.Activate_Entregas_MapaComp = true;
  }
}
