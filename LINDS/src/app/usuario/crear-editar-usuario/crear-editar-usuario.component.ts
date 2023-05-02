import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-crear-editar-usuario',
  templateUrl: './crear-editar-usuario.component.html',
  styleUrls: ['./crear-editar-usuario.component.scss'],
})
export class CrearEditarUsuarioComponent implements OnInit {
  constructor(private service: SharedService) {}

  rolList: any = [];
  sucursalList: any = [];
  empresaList: any = [];

  @Input() usuario: any;
  id: string = '';
  cedula: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  password: string = '';
  rol: any;
  empresa: any;
  sucursal: any;

  ngOnInit() {
    this.id = this.usuario.id;
    this.cedula = this.usuario.cedula;
    this.nombre = this.usuario.nombre;
    this.apellido = this.usuario.apellido;
    this.correo = this.usuario.correo;
    this.password = this.usuario.password;
    this.rol = this.usuario.rol;
    this.sucursal = this.usuario.sucursal;
    this.empresa = this.usuario.empresa;
    this.cargarRol();
    this.cargarEmpresa();
    this.cargarSucursal();
  }

  add() {
    var val = {
      cedula: this.cedula,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      password: this.password,
      rol: this.rol,
      empresa: this.empresa,
      sucursal: this.sucursal,
    };
    var correo = {
      correo: this.correo,
      password: this.password,
    }
    this.service.addUsuario(val).subscribe((res) => {
      alert(res.toString());
    });

    this.service.correo(correo).subscribe((res) => {});
  }

  editar() {
    var val = {
      id: this.id,
      cedula: this.cedula,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      password: this.password,
      rol: this.rol,
      empresa: this.empresa,
      sucursal: this.sucursal,
    };
    this.service.updateUsuario(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  cargarRol() {
    this.service.getRolList().subscribe((data) => {
      this.rolList = data;
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