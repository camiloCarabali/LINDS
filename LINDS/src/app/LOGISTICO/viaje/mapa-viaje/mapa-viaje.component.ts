import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

declare var google: any;

@Component({
  selector: 'app-mapa-viaje',
  templateUrl: './mapa-viaje.component.html',
  styleUrls: ['./mapa-viaje.component.scss'],
})
export class MapaViajeComponent implements OnInit {
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(private service: SharedService) {}

  @Input() viaje: any;
  id: string = '';
  inicio: string = '';
  llegada: string = '';

  ngOnInit() {
    this.id = this.viaje.id;
    this.inicio = localStorage.getItem('puntoInicio')!;
    this.loadMap();
  }

  loadMap() {
    const mapEle = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapEle, {
      center: {
        query: this.inicio,
      },
      zoom: 12,
    });

    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute() {
    const waypoints: any = [];
    console.log(this.inicio)
    this.service.waypoints(this.id).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        waypoints.push({
          location: data[i],
          stopover: true,
        });
      }
      this.llegada = data[data.length - 1];
      waypoints.pop()
      console.log(this.llegada)
      this.directionsService
        .route({
          origin: {
            query: this.inicio,
          },
          destination: {
            query: this.llegada,
          },
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response: any) => {
          this.directionsDisplay.setDirections(response);
        });
    });
  }
}
