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
  altura: number = 0;
  ancho: number = 0;
  largo: number = 0;
  volumen: number = 0;
  puntoEntrega: string = '';
  destinatario: string = '';
  correoDestinatario: string = '';
  remitente: string = '';
  correoRemitente: string = '';
  estado: string = '';
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
    this.altura = this.mercancia.altura;
    this.ancho = this.mercancia.ancho;
    this.largo = this.mercancia.largo;
    this.volumen = this.mercancia.volumen;
    this.puntoEntrega = this.mercancia.puntoEntrega;
    this.destinatario = this.mercancia.destinatario;
    this.correoDestinatario = this.mercancia.correoDestinatario;
    this.remitente = this.mercancia.remitente;
    this.correoRemitente = this.mercancia.correoRemitente;
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
    this.volumen = this.altura * this.ancho * this.largo;
    var val = {
      puntoInicio: localStorage.getItem('puntoInicio'),
      nombre: this.nombre,
      peso: this.peso,
      altura: this.altura,
      ancho: this.ancho,
      largo: this.largo,
      volumen: this.volumen,
      puntoEntrega: this.puntoEntrega,
      destinatario: this.destinatario,
      correoDestinatario: this.correoDestinatario,
      remitente: this.remitente,
      correoRemitente: this.correoRemitente,
      viaje: this.viaje,
      empresa: localStorage.getItem('empresa'),
      sucursal: localStorage.getItem('sucursal'),
      estado: 'Sin Asignar',
    };

    var correo = {
      sucursal: localStorage.getItem('sucursal'),
      correoDestinatario: this.correoDestinatario,
      destinatario: this.destinatario,
      correoRemitente: this.correoRemitente,
      remitente: this.remitente,
    };

    if (confirm('¿Desea registrar una nueva mercancia?')) {
      this.service.addMercancia(val).subscribe((res: any) => {
        if (res.status === 200) {
          this.service.correoDestinatario(correo).subscribe((data: any) => {});
          this.service.correoRemitente(correo).subscribe((data: any) => {});
          this.interaction.presentToast(
            'top',
            'Recepción de Mercancia Completada'
          );
          setTimeout(function () {
            location.reload();
          }, 2000);
        }
      });
    }
  }

  edit() {
    this.volumen = this.altura * this.ancho * this.largo;
    var val = {
      id: this.id,
      puntoInicio: this.puntoInicio,
      nombre: this.nombre,
      peso: this.peso,
      altura: this.altura,
      ancho: this.ancho,
      largo: this.largo,
      volumen: this.volumen,
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

    if (confirm('¿Desea actualizar la informacion de la mercancia?')) {
      this.service.updateMercancia(val).subscribe((res) => {
        this.interaction.presentToast('top', res.toString());
      });
      setTimeout(function () {
        location.reload();
      }, 2000);
    }
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
