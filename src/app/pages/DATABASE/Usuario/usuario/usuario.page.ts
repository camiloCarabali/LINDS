import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { RegistroGeoPage } from '../../../Geolocation/registro-geo/registro-geo.page';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
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

  usuarios = [];

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction: UiServiceService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.mostrarUsuario();
  }

  async registro() {
    const modal = await this.modalCtrl.create({
      component: RegistroGeoPage,
    });
    return await modal.present();
  }

  async mostrarUsuario() {
    const path = 'Usuarios';
    this.firestore.read(path).then((firebaseResponse) => {
      firebaseResponse.subscribe((usuariosRef) => {
        this.usuarios = usuariosRef.map((usuarioRef) => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        });
      });
    });
  }

  eliminarUsuario(id) {
    const path = 'Usuarios'
    this.interaction.showLoading('eliminando...');
    this.firestore
      .delete(path, id)
      .then((res) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Usuario eliminada con exito.');
      })
      .catch((err) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error al eliminar.');
      });
  }
  
}
