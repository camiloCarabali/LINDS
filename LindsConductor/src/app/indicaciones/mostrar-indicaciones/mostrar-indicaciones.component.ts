import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-mostrar-indicaciones',
  templateUrl: './mostrar-indicaciones.component.html',
  styleUrls: ['./mostrar-indicaciones.component.scss'],
})
export class MostrarIndicacionesComponent implements OnInit {
  sourceLocation: any;
  destinationLocation: any;

  waypoints: any = [];

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor() {}

  ngOnInit() {
    this.sourceLocation = localStorage.getItem('rutaInicio');
    this.destinationLocation = localStorage.getItem('rutaLlegada');
    this.loadIndicators();
    this.calculateRoute();
  }

  loadIndicators() {
    const indicatorsEle = document.getElementById('indicators') as HTMLElement;
    this.directionsDisplay.setPanel(indicatorsEle);
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
}
