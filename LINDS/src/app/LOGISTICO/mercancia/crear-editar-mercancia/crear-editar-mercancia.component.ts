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
  conductorList: any = [];
  camionList: any = [];
  viajeList: any = [];

  @Input() mercancia: any;
  id: string = '';
  puntoInicio: string = '';
  nombre: string = '';
  peso: number = 0;
  puntoEntrega: string = '';
  destinatario: string = '';
  correoDestinatario: string = '';
  estado: boolean = true;
  carga: boolean = false;
  descarga: boolean = false;
  empresa: any;
  sucursal: any;
  viaje: any;

  ngOnInit() {
    this.id = this.mercancia.id;
    this.puntoInicio = this.mercancia.puntoInicio;
    this.nombre = this.mercancia.nombre;
    this.peso = this.mercancia.peso;
    this.puntoEntrega = this.mercancia.puntoEntrega;
    this.destinatario = this.mercancia.destinatario;
    this.correoDestinatario = this.mercancia.correoDestinatario;
    this.estado = this.mercancia.estado;
    this.carga = this.mercancia.carga;
    this.descarga = this.mercancia.descarga;
    this.empresa = this.mercancia.empresa;
    this.sucursal = this.mercancia.sucursal;
    this.viaje = this.mercancia.viaje;
    this.cargarPuntoEntrega();
    this.direccion();
    this.cargarConductor();
    this.cargarCamion();
    this.cargarViaje();
  }

  add() {
    if (this.viaje == '') {
      this.viaje = null;
    }
    var val = {
      puntoInicio: localStorage.getItem('puntoInicio'),
      nombre: this.nombre,
      peso: this.peso,
      puntoEntrega: this.puntoEntrega,
      destinatario: this.destinatario,
      correoDestinatario: this.correoDestinatario,
      viaje: this.viaje,
      empresa: localStorage.getItem('empresa'),
      sucursal: localStorage.getItem('sucursal'),
    };

    var correo = {
      sucursal: localStorage.getItem('sucursal'),
      correo: this.correoDestinatario,
      destinatario: this.destinatario,
    };

    this.service.addMercancia(val).subscribe((res: any) => {
      if (res.status === 200) {
        this.service.correoMercancia(correo).subscribe((data: any) => {});
        this.interaction.presentToast('top', 'Recepción de Mercancia Completada');
      }
    });
  }

  edit() {
    var val = {
      id: this.id,
      puntoInicio: this.puntoInicio,
      nombre: this.nombre,
      peso: this.peso,
      puntoEntrega: this.puntoEntrega,
      destinatario: this.destinatario,
      correoDestinatario: this.correoDestinatario,
      estado: this.estado,
      carga: this.carga,
      descarga: this.descarga,
      empresa: this.empresa,
      sucursal: this.sucursal,
      viaje: this.viaje,
    };
    this.service.updateMercancia(val).subscribe((res) => {
      this.interaction.presentToast('top', res.toString());
    });
  }

  direccion() {
    let valor = localStorage.getItem('sucursal')!;
    this.service
      .direccionSucursal(valor.replace(/ /g, '_'))
      .subscribe((data: any) => {
        this.puntoInicio = data;
        localStorage.setItem('puntoInicio', data);
      });
  }

  cargarConductor() {
    let sucursal = localStorage.getItem('sucursal') as string;
    this.service
      .getBuscarConductor(sucursal.replace(/ /g, '_'))
      .subscribe((data) => {
        this.conductorList = data;
      });
  }

  cargarCamion() {
    let sucursal = localStorage.getItem('sucursal') as string;
    this.service
      .getCamionDisponibleList(sucursal.replace(/ /g, '_'))
      .subscribe((data) => {
        this.camionList = data;
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

  cargarViaje() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service.buscarViaje(valor.replace(/ /g, '_')).subscribe((data) => {
      this.viajeList = data;
    });
  }
}
