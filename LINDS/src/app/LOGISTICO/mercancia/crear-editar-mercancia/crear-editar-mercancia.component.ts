import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-crear-editar-mercancia',
  templateUrl: './crear-editar-mercancia.component.html',
  styleUrls: ['./crear-editar-mercancia.component.scss'],
})
export class CrearEditarMercanciaComponent implements OnInit {
  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  puntoEntregaList: any = [];

  @Input() mercancia: any;
  id: string = '';
  nombre: string = '';
  peso: number = 0;
  estado: boolean = true;
  carga: boolean = false;
  descarga: boolean = false;
  empresa: any;
  sucursal: any;
  puntoEntrega: string = '';

  ngOnInit() {
    this.id = this.mercancia.id;
    this.nombre = this.mercancia.nombre;
    this.peso = this.mercancia.peso;
    this.estado = this.mercancia.estado;
    this.carga = this.mercancia.carga;
    this.descarga = this.mercancia.descarga;
    this.empresa = this.mercancia.empresa;
    this.sucursal = this.mercancia.sucursal;
    this.puntoEntrega = this.mercancia.puntoEntrega;
    this.cargarPuntoEntrega();
  }

  add() {
    var val = {
      nombre: this.nombre,
      peso: this.peso,
      puntoEntrega: this.puntoEntrega,
      empresa: localStorage.getItem('empresa'),
      sucursal: localStorage.getItem('sucursal'),
    };
    this.service.addMercancia(val).subscribe((res: any) => {
      this.interaction.presentToast('top', res.toString());
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
      empresa: this.empresa,
      sucursal: this.sucursal,
    };
    this.service.updateMercancia(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  cargarPuntoEntrega() {
    let valor = localStorage.getItem('sucursal')!;
    this.service
      .buscarPuntoEntregaSucursal(valor.replace(/ /g, '_'))
      .subscribe((data) => {
        this.puntoEntregaList = data;
      });
  }
}
