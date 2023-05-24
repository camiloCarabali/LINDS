import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-crear-editar-camion',
  templateUrl: './crear-editar-camion.component.html',
  styleUrls: ['./crear-editar-camion.component.scss'],
})
export class CrearEditarCamionComponent  implements OnInit {

  constructor(private service: SharedService) { }

  empresaList: any = [];
  sucursalList: any = [];

  @Input() camion: any;
  id: string = '';
  matricula: string = '';
  modelo: string = '';
  tipo: string = '';
  color: string = '';
  capacidad: number = 0;
  empresa: any;
  sucursal: any;

  ngOnInit() {
    this.id = this.camion.id;
    this.matricula = this.camion.matricula
    this.modelo = this.camion.modelo
    this.tipo = this.camion.tipo
    this.color = this.camion.color
    this.capacidad = this.camion.capacidad
    this.empresa = this.camion.empresa
    this.sucursal = this.camion.sucursal
    this.cargarEmpresa();
    this.cargarSucursal();
  }

  add() {
    var val = {
      matricula: this.matricula,
      modelo: this.modelo,
      tipo: this.tipo,
      color: this.color,
      capacidad: this.capacidad,
      empresa: this.empresa,
      sucursal: this.sucursal
    };
    this.service.addCamion(val).subscribe((res: any) => {
      alert(res.toString());
    });
  }

  edit() {
    var val = {
      matricula: this.matricula,
      modelo: this.modelo,
      tipo: this.tipo,
      color: this.color,
      capacidad: this.capacidad,
      empresa: this.empresa,
      sucursal: this.sucursal
    };
    this.service.updateCamion(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  cargarEmpresa() {
    this.service.getEmpresaList().subscribe((data) => {
      this.empresaList = data;
    });
  }

  cargarSucursal() {
    this.service.getBuscarSucursal(this.empresa).subscribe((data) => {
      this.sucursalList = data;
    });
  }

}
