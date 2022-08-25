import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Empresa } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

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

  validacion() {
    return this.empresa.nombre == null || this.empresa.nit == null
      ? false
      : true;
  }

  async crearEmpresa() {
    this.interaction.showLoading('creando...');
    if (this.validacion()) {
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
      this.interaction.alertaInformativa(
        'Los campos no pueden estar vacios o erroneos'
      );
    }
  }
}
