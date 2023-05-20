import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-viaje',
  templateUrl: './mostrar-viaje.component.html',
  styleUrls: ['./mostrar-viaje.component.scss'],
})
export class MostrarViajeComponent implements OnInit {
  viaje: any = [];

  constructor(private service: SharedService) {}

  ngOnInit() {
    this.refreshViaje();
  }

  refreshViaje() {
    this.service.getHistorial('1000000').subscribe((data: any) => {
      this.viaje = data;
    });
  }
}
