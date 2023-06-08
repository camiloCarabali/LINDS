import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-crear-editar-viaje',
  templateUrl: './crear-editar-viaje.component.html',
  styleUrls: ['./crear-editar-viaje.component.scss'],
})
export class CrearEditarViajeComponent implements OnInit {
  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  camionList: any = [];
  conductorList: any = [];
  mercanciaList: any = [];
  mercanciaList2: any = [];

  @Input() viaje: any;
  id: string = '';
  fecha: string = '';
  estado: string = '';
  camion: any;
  usuario: any;
  empresa: any;
  sucursal: any;
  mercancia: any = [];

  today: any = new Date().toISOString();

  ngOnInit() {
    this.interaction.presentAlert(
      'Recuerda validar todos los puntos de entrega de tus mercancias antes de crear un viaje.'
    );
    this.id = this.viaje.id;
    this.fecha = this.viaje.fecha;
    this.estado = this.viaje.estado;
    this.camion = this.viaje.camion;
    this.usuario = this.viaje.usuario;
    this.empresa = this.viaje.empresa;
    this.sucursal = this.viaje.sucursal;
    this.cargarCamion();
    this.cargarConductor();
    this.cargarMercancia();
    this.cargarMercancia2()
  }

  add() {
    var val = {
      fecha: this.today,
      camion: this.camion,
      usuario: this.usuario,
      estado: 'Cargado',
      empresa: localStorage.getItem('empresa'),
      sucursal: localStorage.getItem('sucursal'),
    };

    if (confirm('¿Desea crear este viaje?')) {
      this.service.ocupadoCamion(val.camion).subscribe((res: any) => {});
      this.service.noDisponibleUsuario(val.usuario).subscribe((res: any) => {});
      this.service.addViaje(val).subscribe((res: any) => {
        for (let i of this.mercancia) {
          this.service
            .asignarMercancia(i.replace(/ /g, '_'), res.viaje.id)
            .subscribe((data) => {});
        }
        this.interaction.presentToast('top', res.mensaje);
      });
      this.service;
      setTimeout(function () {
        location.reload();
      }, 2000);
    }
  }

  edit() {
    var val = {
      id: this.id,
      fecha: this.fecha,
      camion: this.camion,
      usuario: this.usuario,
      empresa: this.empresa,
      sucursal: this.sucursal,
      estado: this.estado,
    };

    if (confirm('¿Desea actualizar la información del viaje?')) {
      this.service.ocupadoCamion(val.camion).subscribe((res: any) => {});
      this.service.updateViaje(val).subscribe((res: any) => {
        this.service.noAsignarMercancia(res.viaje.id).subscribe(() => {});
        for (let i of this.mercancia) {
          this.service
            .asignarMercancia(i.replace(/ /g, '_'), res.viaje.id)
            .subscribe((data) => {});
        }
        this.interaction.presentToast('top', res.mensaje);
      });
      setTimeout(function () {
        location.reload();
      }, 2000);
    }
  }

  cargarCamion() {
    let sucursal = localStorage.getItem('sucursal') as string;
    this.service
      .getCamionDisponibleList(sucursal.replace(/ /g, '_'))
      .subscribe((data) => {
        this.camionList = data;
      });
  }

  cargarConductor() {
    let sucursal = localStorage.getItem('sucursal') as string;
    this.service
      .getBuscarConductorDisponible(sucursal.replace(/ /g, '_'))
      .subscribe((data) => {
        this.conductorList = data;
      });
  }

  cargarMercancia() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service
      .mostrarMercanciaSinAsignarSucursal(valor.replace(/ /g, '_'))
      .subscribe((data) => {
        this.mercanciaList = data;
      });
  }

  cargarMercancia2() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service
      .mostrarMercanciaSinAsignarYCargadoSucursal(valor.replace(/ /g, '_'))
      .subscribe((data) => {
        this.mercanciaList2 = data;
      });
  }
}
