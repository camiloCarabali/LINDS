import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-historial',
  templateUrl: './mostrar-historial.component.html',
  styleUrls: ['./mostrar-historial.component.scss'],
})
export class MostrarHistorialComponent implements OnInit {
  constructor(private service: SharedService) {}

  historial: any = [];

  ngOnInit() {
    this.refreshHistorial();
  }

  refreshHistorial() {
    this.service.getHistorial('1000000').subscribe((data: any) => {
      this.historial = data;
    });
  }
}
