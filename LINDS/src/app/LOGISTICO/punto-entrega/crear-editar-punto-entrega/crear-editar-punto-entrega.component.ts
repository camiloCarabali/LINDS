import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-crear-editar-punto-entrega',
  templateUrl: './crear-editar-punto-entrega.component.html',
  styleUrls: ['./crear-editar-punto-entrega.component.scss'],
})
export class CrearEditarPuntoEntregaComponent  implements OnInit {

  constructor(private service: SharedService) { }

  viajeList: any = [];

  @Input() puntoEntrega: any;
  id: string = '';
  direccion: string = '';
  nombre: string = '';
  numero_lote_entrega: string = '';
  viaje: any;

  ngOnInit() {
    this.id = this.puntoEntrega.id
    this.direccion = this.puntoEntrega.direccion
    this.nombre = this.puntoEntrega.nombre
    this.numero_lote_entrega = this.puntoEntrega.numero_lote_entrega
    this.viaje = this.puntoEntrega.viaje
    this.cargarViaje()
  }

  add() {
    var val = {
      direccion: this.direccion,
      nombre: this.nombre,
      numero_lote_entrega: this.numero_lote_entrega,
      viaje: this.viaje
    }
    this.service.addPuntoEntrega(val).subscribe((res: any) => {
      alert(res.toString());
    }); 
  }

  edit() {
    var val = {
      id: this.id,
      direccion: this.direccion,
      nombre: this.nombre,
      numero_lote_entrega: this.numero_lote_entrega,
      viaje: this.viaje
    };
    this.service.updatePuntoEntrega(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  cargarViaje() {
    this.service.getViajeList().subscribe((data) => {
      this.viajeList = data;
    });
  }
}