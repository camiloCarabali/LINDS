import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-crear-editar-punto-entrega',
  templateUrl: './crear-editar-punto-entrega.component.html',
  styleUrls: ['./crear-editar-punto-entrega.component.scss'],
})
export class CrearEditarPuntoEntregaComponent implements OnInit {
  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  viajeList: any = [];

  @Input() puntoEntrega: any;
  id: string = '';
  direccion: string = '';
  viaje: any;
  empresa: any;
  sucursal: any;

  ngOnInit() {
    this.id = this.puntoEntrega.id;
    this.direccion = this.puntoEntrega.direccion;
    this.viaje = this.puntoEntrega.viaje;
    this.empresa = this.puntoEntrega.empresa;
    this.sucursal = this.puntoEntrega.sucursal;
    this.cargarViaje();
  }

  add() {
    var val = {
      direccion: this.direccion,
      viaje: this.viaje,
      empresa: localStorage.getItem('empresa'),
      sucursal: localStorage.getItem('sucursal'),
    };
    this.service.addPuntoEntrega(val).subscribe((res: any) => {
      this.interaction.presentToast('top', res.toString());
    });
  }

  edit() {
    var val = {
      id: this.id,
      direccion: this.direccion,
      viaje: this.viaje,
      empresa: this.empresa,
      sucursal: this.sucursal,
    };
    this.service.updatePuntoEntrega(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  cargarViaje() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service.buscarViaje(valor.replace(/ /g, '_')).subscribe((data) => {
      this.viajeList = data;
    });
  }
}
