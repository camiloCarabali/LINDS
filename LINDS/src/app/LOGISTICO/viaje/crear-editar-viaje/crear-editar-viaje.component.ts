import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-crear-editar-viaje',
  templateUrl: './crear-editar-viaje.component.html',
  styleUrls: ['./crear-editar-viaje.component.scss'],
})
export class CrearEditarViajeComponent  implements OnInit {

  constructor(private service: SharedService) { }

  camionList: any = [];
  conductorList: any = [];

  @Input() viaje: any;
  id: string = '';
  inicio: string = '';
  fecha: string = '';
  camion: any;
  usuario: any;

  today: any = new Date().toISOString();

  ngOnInit() {
    this.id = this.viaje.id
    this.inicio = this.viaje.inicio
    this.fecha = this.viaje.fecha
    this.camion = this.viaje.camion
    this.usuario = this.viaje.usuario
    this.cargarCamion();
    this.cargarConductor();
  }

  add() {
    var val = {
      inicio: this.inicio,
      fecha: this.today,
      camion: this.camion,
      usuario: this.usuario
    };
    this.service.addViaje(val).subscribe((res: any) => {
      alert(res.toString());
    });
    
  }

  edit() {
    var val = {
      id: this.id,
      inicio: this.inicio,
      fecha: this.fecha,
      camion: this.camion,
      usuario: this.usuario
    };
    this.service.updateViaje(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  cargarCamion() {
    this.service.getCamionList().subscribe((data) => {
      this.camionList = data;
    });
  }

  cargarConductor() {
    this.service.getBuscarConductor().subscribe((data) => {
      this.conductorList = data;
    });
  }

}
