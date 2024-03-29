import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';
import { MostrarMercanciaComponent } from '../mostrar-mercancia/mostrar-mercancia.component';

@Component({
  selector: 'app-crear-editar-mercancia',
  templateUrl: './crear-editar-mercancia.component.html',
  styleUrls: ['./crear-editar-mercancia.component.scss'],
})
export class CrearEditarMercanciaComponent implements OnInit {
  constructor(
    private service: SharedService,
    private interaction: UiServiceService,
    private mostrar: MostrarMercanciaComponent
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
  telefonoDestinatario: string = '';
  remitente: string = '';
  correoRemitente: string = '';
  telefonoRemitente: string = '';
  estado: string = '';
  carga: boolean = false;
  fechaCarga: string = '';
  descarga: boolean = false;
  fechaDescarga: string = '';
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
    this.telefonoDestinatario = this.mercancia.telefonoDestinatario;
    this.remitente = this.mercancia.remitente;
    this.correoRemitente = this.mercancia.correoRemitente;
    this.telefonoRemitente = this.mercancia.telefonoRemitente;
    this.estado = this.mercancia.estado;
    this.carga = this.mercancia.carga;
    this.fechaCarga = this.mercancia.fechaCarga;
    this.descarga = this.mercancia.descarga;
    this.fechaDescarga = this.mercancia.fechaDescarga;
    this.empresa = this.mercancia.empresa;
    this.sucursal = this.mercancia.sucursal;
    this.viaje = this.mercancia.viaje;
    this.direccion();
    this.cargarConductor();
    this.cargarCamion();
    this.cargarViaje();
  }

  add() {
    var regex = new RegExp(
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
    );

    if (this.viaje == '') {
      this.viaje = null;
      this.fechaCarga = null!;
      this.fechaDescarga = null!;
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
      telefonoDestinatario: this.telefonoDestinatario,
      remitente: this.remitente,
      correoRemitente: this.correoRemitente,
      telefonoRemitente: this.telefonoRemitente,
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

    if (regex.test(val.correoRemitente) && regex.test(val.correoDestinatario)) {
      if (
        ![
          val.nombre,
          val.peso,
          val.altura,
          val.ancho,
          val.largo,
          val.puntoEntrega,
          val.destinatario,
          val.correoDestinatario,
          val.telefonoDestinatario,
          val.remitente,
          val.correoRemitente,
          val.telefonoRemitente,
        ].every(Boolean)
      ) {
        this.interaction.presentToast(
          'top',
          'Por favor llenar todos los campos'
        );
      } else {
        if (confirm('¿Desea registrar una nueva mercancia?')) {
          this.service.addMercancia(val).subscribe((res: any) => {
            if (res.status === 200) {
              this.service
                .correoDestinatario(correo)
                .subscribe((data: any) => {});
              this.service.correoRemitente(correo).subscribe((data: any) => {});
              this.interaction.presentToast(
                'top',
                'Recepción de Mercancia Completada'
              );
              this.mostrar.cancel();
              this.interaction.presentAlert1(
                'Por favor valide el punto de entrega en el mapa.'
              );
            }
          });
        }
      }
    } else {
      this.interaction.presentToast('top', 'Por favor digite un correo valido');
    }
  }

  edit() {
    if (this.viaje != null) {
      this.estado = 'Cargado';
    }
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
      telefonoDestinatario: this.telefonoDestinatario,
      remitente: this.remitente,
      correoRemitente: this.correoRemitente,
      telefonoRemitente: this.telefonoRemitente,
      estado: this.estado,
      carga: this.carga,
      fechaCarga: this.fechaCarga,
      descarga: this.descarga,
      fechaDescarga: this.fechaDescarga,
      empresa: this.empresa,
      sucursal: this.sucursal,
      viaje: this.viaje,
    };

    if (confirm('¿Desea actualizar la informacion de la mercancia?')) {
      this.service.updateMercancia(val).subscribe((res) => {
        this.interaction.presentToast('top', res.toString());
        if (res.toString() === 'Mercancia modificada') {
          this.mostrar.cancel();
        }
      });
      this.interaction.presentAlert1(
        'Por favor valide el punto de entrega en el mapa.'
      );
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

  cargarViaje() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service
      .buscarViajeCargados(valor.replace(/ /g, '_'))
      .subscribe((data) => {
        this.viajeList = data;
      });
  }
}
