import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-mercancia',
  templateUrl: './mostrar-mercancia.component.html',
  styleUrls: ['./mostrar-mercancia.component.scss'],
})
export class MostrarMercanciaComponent implements OnInit {
  mercanciaList: any = [];

  @Input() mercancia: any;
  direccion: string = '';

  constructor(private service: SharedService) {}

  ngOnInit() {
    this.direccion = this.mercancia.direccion;
    this.getMercancia();
  }

  getMercancia() {
    const valor = this.direccion.replace('#', 'AA');

    this.service.buscarMercancia(valor.replace(/ /g, '_')).subscribe((data) => {
      this.mercanciaList = data;
    });
  }
}
