import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Empresa } from 'app/models/models';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.page.html',
  styleUrls: ['./crear-empresa.page.scss'],
})
export class CrearEmpresaPage implements OnInit {
  empresa: Empresa = {
    nombre: null,
    nit: null,
  };

  constructor(
    public modalCtrl: ModalController,
    private firestore: FirestoreService,
    private interaction: UiServiceService
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  tamano() {
    var cadena = String(this.empresa.nit);
    if (cadena.length == 10) {
      return true;
    } else {
      return false;
    }
  }

  isEmpty() {
    return this.empresa.nombre == null || this.empresa.nit == null
      ? false
      : true;
  }

  async crearEmpresa() {
    this.interaction.showLoading('creando...');
    if (this.isEmpty() && this.tamano()) {
      const path = 'Empresas';
      await this.firestore
        .create(this.empresa, path)
        .then((res) => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Empresa registrada con exito');
          this.dismiss();
        })
        .catch((error) => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Error al registrar');
        });
    } else {
      this.interaction.closeLoading();
      this.interaction.alertaInformativa(
        'Los campos no pueden estar vacios o erroneos'
      );
    }
  }
}
