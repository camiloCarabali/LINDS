import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Empresa, Sucursal, Usuario } from 'app/models/models';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {
  @Input() branch;

  usuario: Usuario = {
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

  empresa: Empresa = {
    id: null,
    nombre: null,
    nit: null,
  };

  empresas = [];
  sucursales = [];

  constructor(
    public modalCtrl: ModalController,
    private firestore: FirestoreService,
    private interaction: UiServiceService
  ) {}

  ngOnInit() {
    this.usuario.empresa = this.branch.empresa;
    this.usuario.sucursal = this.branch.sucursal;
    this.usuario.nombre = this.branch.nombre;
    this.usuario.cedula = this.branch.cedula;
    this.usuario.correo = this.branch.correo;
    this.usuario.perfil = this.branch.perfil;
    this.usuario.uid = this.branch.id;
    this.mostrarEmpresas();
    this.mostrarSucursales();
  }

  dismiss() {
    this.modalCtrl.dismiss();
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
      firebaseResponse.subscribe((listaDeSucursalRef) => {
        this.sucursales = listaDeSucursalRef.map((sucursalesRef) => {
          let sucursales = sucursalesRef.payload.doc.data();
          sucursales['id'] = sucursalesRef.payload.doc.id;
          return sucursales;
        });
      });
    });
  }

  async modificarUsuario(id) {
    this.interaction.showLoading('creando...');
    id = this.branch.id;
    const path = 'Usuarios';
    this.firestore
      .update(this.usuario, path, id)
      .then((res) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Usuario modificado con exito');
        this.dismiss();
      })
      .catch((err) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error al modificar');
      });
  }
}
