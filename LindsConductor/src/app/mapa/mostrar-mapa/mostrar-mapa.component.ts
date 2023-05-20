import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-mostrar-mapa',
  templateUrl: './mostrar-mapa.component.html',
  styleUrls: ['./mostrar-mapa.component.scss'],
})
export class MostrarMapaComponent implements OnInit {
  map = null;

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const mapEle = document.getElementById('map') as HTMLElement;
    const myLatLng = { lat: 4.658383846282959, lng: -74.09394073486328 };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12,
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }
}
