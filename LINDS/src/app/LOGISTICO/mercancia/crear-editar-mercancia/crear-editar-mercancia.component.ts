import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-crear-editar-mercancia',
  templateUrl: './crear-editar-mercancia.component.html',
  styleUrls: ['./crear-editar-mercancia.component.scss'],
})
export class CrearEditarMercanciaComponent implements OnInit {
  constructor(private service: SharedService) {}

  puntoEntregaList: any = [];

  @Input() mercancia: any;
  id: string = '';
  nombre: string = '';
  peso: number = 0;
  estado: boolean = true;
  carga: boolean = false;
  descarga: boolean = false;
  puntoEntrega: string = '';

  ngOnInit() {
    this.id = this.mercancia.id;
    this.nombre = this.mercancia.nombre;
    this.peso = this.mercancia.peso;
    this.estado = this.mercancia.estado;
    this.carga = this.mercancia.carga;
    this.descarga = this.mercancia.descarga;
    this.puntoEntrega = this.mercancia.puntoEntrega;
    this.cargarPuntoEntrega();
  }

  add() {
    var val = {
      nombre: this.nombre,
      peso: this.peso,
      puntoEntrega: this.puntoEntrega,
    };
    this.service.addMercancia(val).subscribe((res: any) => {
      alert(res.toString());
    });
  }

  edit() {
    var val = {
      id: this.id,
      nombre: this.nombre,
      peso: this.peso,
      estado: this.estado,
      carga: this.carga,
      descarga: this.descarga,
      puntoEntrega: this.puntoEntrega,
    };
    this.service.updateMercancia(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  cargarPuntoEntrega() {
    this.service.getPuntoEntregaList().subscribe((data) => {
      this.puntoEntregaList = data;
    });
  }
}
