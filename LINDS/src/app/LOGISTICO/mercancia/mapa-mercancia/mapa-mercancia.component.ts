import { Component, Input, OnInit } from '@angular/core';

declare var google: any;

interface Marker {
  address: string;
}

@Component({
  selector: 'app-mapa-mercancia',
  templateUrl: './mapa-mercancia.component.html',
  styleUrls: ['./mapa-mercancia.component.scss'],
})
export class MapaMercanciaComponent implements OnInit {
  map: any;

  constructor() {}

  @Input() viaje: any;
  punto: string = '';

  ngOnInit() {
    this.punto = localStorage.getItem('mercancia')!;
    this.loadMap1();
  }

  loadMap1() {
    const mapEle: HTMLElement = document.getElementById('map')!;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: this.punto }, (results: any, status: any) => {
      if (status === 'OK') {
        const centerLatLng = results[0].geometry.location;

        this.map = new google.maps.Map(mapEle, {
          center: centerLatLng,
          zoom: 12,
        });

        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
          const marker = {
            address: this.punto,
          };
          this.addMarker(marker);
        });
      } else {
        console.error('La geocodificación ha fallado debido a: ' + status);
      }
    });
  }

  addMarker(marker: Marker) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: marker.address },
      (results: any, status: any) => {
        if (status === 'OK') {
          const position = results[0].geometry.location;

          new google.maps.Marker({
            position: position,
            map: this.map,
          });
        } else {
          console.error('La geocodificación ha fallado debido a: ' + status);
        }
      }
    );
  }
}
