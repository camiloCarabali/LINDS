import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { identity } from 'rxjs';
import { Usuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { CrearUsuarioPage } from '../../DATABASE/Usuario/crear-usuario/crear-usuario.page';

@Component({
  selector: 'app-registro-geo',
  templateUrl: './registro-geo.page.html',
  styleUrls: ['./registro-geo.page.scss'],
})
export class RegistroGeoPage implements OnInit {
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

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction: UiServiceService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async registrar() {
    this.interaction.showLoading('registrando...');
    
    const res = await this.auth.register(this.usuario).catch((error) => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Error al registrar');
      this.dismiss();
    });
    if (res) {
      const id = res.user.uid;
      const email = this.usuario.correo;
      this.dismiss();
      this.interaction.closeLoading();
      this.showModalCreate(email, id);
    }
    
  }

  async showModalCreate(email, id) {
    const modal = await this.modalCtrl.create({
      component: CrearUsuarioPage,
      componentProps: {
        correo: email,
        id: id
      },
    });
    return await modal.present();
  }
}