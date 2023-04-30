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
  departamentoList: any = [];
  municipioList: any = [];

  @Input() sucursal: any;
  id: string = '';
  nombre: string = '';
  empresa: any;
  direccion: string = '';
  departamento: any;
  municipio: any;

  
  ngOnInit() {
    this.id = this.sucursal.id;
    this.nombre = this.sucursal.nombre;
    this.empresa = this.sucursal.empresa;
    this.direccion = this.sucursal.direccion;
    this.departamento = this.sucursal.departamento;
    this.municipio = this.sucursal.municipio;
    this.cargarEmpresas();
    this.cargarDepartamentos();
    this.cargarMunicipio();
  }

  add() {
    var val = {
      id: this.id,
      nombre: this.nombre,
      empresa: this.empresa,
      direccion: this.direccion,
      departamento: this.departamento,
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
      departamento: this.departamento,
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
  cargarDepartamentos() {
    this.service.getDepartamentoList().subscribe((data) => {
      this.departamentoList = data;
    });
  }

  cargarMunicipio() {
    this.service.getBuscarMunicipio(this.departamento).subscribe((data) => {
      this.municipioList = data;
    });
  }
}
