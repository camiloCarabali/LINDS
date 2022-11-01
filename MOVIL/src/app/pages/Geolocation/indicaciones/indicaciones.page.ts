import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-indicaciones',
  templateUrl: './indicaciones.page.html',
  styleUrls: ['./indicaciones.page.scss'],
})
export class IndicacionesPage implements OnInit {
  @Input() a;
  @Input() b;

  sourceLocation = '';
  destinationLocation = '';

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    this.sourceLocation = this.a;
    this.destinationLocation = this.b;
    this.calculateAndDisplayRoute();
    this.loadIndicators();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  loadIndicators() {
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    this.directionsDisplay.setPanel(indicatorsEle);
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
}
