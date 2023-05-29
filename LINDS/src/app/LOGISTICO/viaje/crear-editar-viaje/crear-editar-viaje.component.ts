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

  @Input() viaje: any;
  id: string = '';
  inicio: string = '';
  fecha: string = '';
  camion: any;
  usuario: any;
  empresa: any;
  sucursal: any;

  today: any = new Date().toISOString();

  ngOnInit() {
    this.id = this.viaje.id;
    this.inicio = this.viaje.inicio;
    this.fecha = this.viaje.fecha;
    this.camion = this.viaje.camion;
    this.usuario = this.viaje.usuario;
    this.empresa = this.viaje.empresa;
    this.sucursal = this.viaje.sucursal;
    this.cargarCamion();
    this.cargarConductor();
  }

  add() {
    var val = {
      inicio: this.inicio,
      fecha: this.today,
      camion: this.camion,
      usuario: this.usuario,
      empresa: localStorage.getItem('empresa'),
      sucursal: localStorage.getItem('sucursal'),
    };
    this.service.ocupadoCamion(val.camion).subscribe((res: any) => {});
    this.service.addViaje(val).subscribe((res: any) => {
      this.interaction.presentToast('top', res.toString());
    });
  }

  edit() {
    var val = {
      id: this.id,
      inicio: this.inicio,
      fecha: this.fecha,
      camion: this.camion,
      usuario: this.usuario,
      empresa: this.empresa,
      sucursal: this.sucursal,
    };
    this.service.ocupadoCamion(val.camion).subscribe((res: any) => {});
    this.service.updateViaje(val).subscribe((res) => {
      this.interaction.presentToast('top', res.toString());
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

  cargarConductor() {
    let sucursal = localStorage.getItem('sucursal') as string;
    this.service
      .getBuscarConductor(sucursal.replace(/ /g, '_'))
      .subscribe((data) => {
        this.conductorList = data;
      });
  }
}
