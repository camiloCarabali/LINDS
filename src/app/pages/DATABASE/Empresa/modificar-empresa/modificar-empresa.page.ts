import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Empresa } from 'app/models/models';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-modificar-empresa',
  templateUrl: './modificar-empresa.page.html',
  styleUrls: ['./modificar-empresa.page.scss'],
})
export class ModificarEmpresaPage implements OnInit {
  @Input() business;

  empresa: Empresa = {
    nombre: null,
    nit: null,
  };

  constructor(
    public modalCtrl: ModalController,
    private firestore: FirestoreService,
    private interaction: UiServiceService
  ) {}

  ngOnInit() {
    this.empresa.nombre = this.business.nombre;
    this.empresa.nit = this.business.nit;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async modificarEmpresa(id) {
    this.interaction.showLoading('creando...');
    id = this.business.id;
    const path = 'Empresas';
    this.firestore
      .update(this.empresa, path, id)
      .then((res) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Empresa modificada con exito');
        this.dismiss();
      })
      .catch((err) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error al modificar');
      });
  }
}
