import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-crear-editar-usuario',
  templateUrl: './crear-editar-usuario.component.html',
  styleUrls: ['./crear-editar-usuario.component.scss'],
})
export class CrearEditarUsuarioComponent implements OnInit {
  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

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
  estado: any;
  disponibilidad: string = '';

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
    this.disponibilidad = this.usuario.disponibilidad;
    this.estado = this.usuario.estado;
    console.log(this.estado)
    this.cargarRol();
    this.cargarEmpresa();
    this.cargarSucursal();
  }

  add() {
    var val: any;
    if (this.rol == 'Administrador') {
      val = {
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        password: this.password,
        rol: this.rol,
        empresa: null,
        sucursal: null,
        disponibilidad: null,
      };
    } else if (this.rol == 'Conductor') {
      val = {
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        password: this.password,
        rol: this.rol,
        empresa: this.empresa,
        sucursal: this.sucursal,
        disponibilidad: 'Disponible',
      };
    } else {
      val = {
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        password: this.password,
        rol: this.rol,
        empresa: this.empresa,
        sucursal: this.sucursal,
        disponibilidad: null,
      };
    }

    var correo = {
      correo: this.correo,
      password: this.password,
    };
    this.service.addUsuario(val).subscribe((res: any) => {
      if (res.status === 200) {
        this.service.correo(correo).subscribe((data: any) => {});
        this.interaction.presentToast(
          'top',
          'El usuario ha sido creado exitosamente'
        );
      }
    });
  }

  editar() {
    var val = {
      cedula: this.cedula,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      password: this.password,
      rol: this.rol,
      empresa: this.empresa,
      sucursal: this.sucursal,
      estado: this.estado
    };
    this.service.updateUsuario(val).subscribe((res) => {
      this.interaction.presentToast('top', res.toString());
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
