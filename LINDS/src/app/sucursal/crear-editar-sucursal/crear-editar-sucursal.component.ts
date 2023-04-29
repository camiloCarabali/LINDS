import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-crear-editar-sucursal',
  templateUrl: './crear-editar-sucursal.component.html',
  styleUrls: ['./crear-editar-sucursal.component.scss'],
})
export class CrearEditarSucursalComponent implements OnInit {
  constructor(private service: SharedService) {}

  empresaList: any = [];
  municipioList: any = [];

  @Input() sucursal: any;
  id: string = '';
  nombre: string = '';
  empresa: any;
  direccion: string = '';
  municipio: any;

  
  ngOnInit() {
    this.id = this.sucursal.id;
    this.nombre = this.sucursal.nombre;
    this.empresa = this.sucursal.empresa;
    this.direccion = this.sucursal.direccion;
    this.municipio = this.sucursal.municipio;
    this.cargarEmpresas();
    this.cargarMunicipios();
  }

  add() {
    var val = {
      id: this.id,
      nombre: this.nombre,
      empresa: this.empresa,
      direccion: this.direccion,
      municipio: this.municipio,
    };
    this.service.addSucursal(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  editar() {
    var val = {
      id: this.id,
      nombre: this.nombre,
      empresa: this.empresa,
      direccion: this.direccion,
      municipio: this.municipio,
    };
    this.service.updateSucursal(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  cargarEmpresas() {
    this.service.getEmpresaList().subscribe((data) => {
      this.empresaList = data;
    });
  }

  cargarMunicipios() {
    this.service.getMunicipioList().subscribe((data) => {
      this.municipioList = data;
    });
  }
}
