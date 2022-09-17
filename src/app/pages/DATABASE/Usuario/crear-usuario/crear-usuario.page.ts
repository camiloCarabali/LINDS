import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Empresa, Sucursal, Usuario } from 'app/models/models';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  @Input() correo;
  @Input() id;

  usuario: Usuario = {
    emailVerified: null,
    empresa: null,
    sucursal: null,
    uid: null,
    nombre: null,
    password: null,
    cedula: null,
    correo: null,
    perfil: null,
  };

  sucursal: Sucursal = {
    id: null,
    empresa: null,
    nombre: null,
    ciudad: null,
    direccion: null,
  };

  sucursales = [];

  empresa: Empresa = {
    id: null,
    nombre: null,
    nit: null,
  };

  empresas = [];

  constructor(
    public modalCtrl: ModalController,
    private firestore: FirestoreService,
    private interaction: UiServiceService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario.correo = this.correo;
    this.usuario.uid = this.id;
    this.mostrarEmpresas();
    this.mostrarSucursales();
  }

  async mostrarEmpresas() {
    const path = 'Empresas';
    this.firestore.read(path).then((firebaseResponse) => {
      firebaseResponse.subscribe((listaDeEmpresasRef) => {
        this.empresas = listaDeEmpresasRef.map((empresaRef) => {
          let empresas = empresaRef.payload.doc.data();
          empresas['id'] = empresaRef.payload.doc.id;
          return empresas;
        });
      });
    });
  }

  async mostrarSucursales() {
    const path = 'Sucursales';
    this.firestore.read(path).then((firebaseResponse) => {
      firebaseResponse.subscribe((listaDeSucursalesRef) => {
        this.sucursales = listaDeSucursalesRef.map((sucursalRef) => {
          let sucursales = sucursalRef.payload.doc.data();
          sucursales['id'] = sucursalRef.payload.doc.id;
          return sucursales;
        });
      });
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  isEmpty() {
    return this.usuario.cedula == null ||
    this.usuario.nombre == null ||
    this.usuario.empresa == null ||
    this.usuario.perfil == null ||
    this.usuario.sucursal == null
    ? false
    : true;
  }

  validacion() {
    return this.usuario.cedula == null ||
      this.usuario.nombre == null ||
      this.usuario.empresa == null ||
      this.usuario.perfil == null ||
      this.usuario.sucursal == null
      ? false
      : true;
  }

  async crearUsuario() {
    if (this.isEmpty() && this.validacion()) {
      this.interaction.showLoading('creando...');
      const path = 'Usuarios';
      await this.firestore
        .create(this.usuario, path)
        .then((res) => {
          this.interaction.presentToast('Usuario registrado con exito');
          this.dismiss();
          this.interaction.closeLoading();
          this.interaction.alertaInformativa(
            'Por motivos de seguridad se debe cerrar sesion'
          );
          this.logout();
        })
        .catch((err) => {
          this.interaction.presentToast('Error al registrar');
          this.interaction.closeLoading();
        });
    } else {
      this.interaction.closeLoading();
      this.interaction.alertaInformativa('Los campos no pueden estar vacios');
    }
  }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('Sesion finalizada');
    this.router.navigate(['/database']);
  }
}
