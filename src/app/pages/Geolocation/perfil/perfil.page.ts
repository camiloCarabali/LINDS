import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'app/models/models';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
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

  usuarios = [];

  constructor(
    private firestore: FirestoreService,
    private interaction: UiServiceService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.mostrarUsuario();
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

}
