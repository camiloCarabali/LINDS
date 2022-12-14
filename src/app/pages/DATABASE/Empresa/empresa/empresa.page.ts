import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Empresa } from 'app/models/models';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';
import { data } from 'jquery';
import { CrearEmpresaPage } from '../crear-empresa/crear-empresa.page';
import { ModificarEmpresaPage } from '../modificar-empresa/modificar-empresa.page';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  empresa: Empresa = {
    id: null,
    nombre: null,
    nit: null,
  };

  empresas = [];

  constructor(
    private firestore: FirestoreService,
    public modalCtrl: ModalController,
    private interaction: UiServiceService
  ) {}

  ngOnInit() {
    this.mostrarEmpresas();
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

  async eliminarEmpresa(id) {
    const path = 'Empresas';
    this.interaction.showLoading('eliminando...');
    this.firestore
      .delete(path, id)
      .then((res) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Empresa eliminada con exito.');
      })
      .catch((err) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error al eliminar.');
      });
  }

  async buscarEmpresa(position, uid) {
    (await this.firestore.searchCargo(position, uid)).subscribe((cargo) => {
      console.log(cargo);
    });
  }

  async showModalCreate() {
    const modal = await this.modalCtrl.create({
      component: CrearEmpresaPage,
    });
    return await modal.present();
  }

  async showModalUpdate(SelectedBusiness) {
    const modal = await this.modalCtrl.create({
      component: ModificarEmpresaPage,
      componentProps: {
        business: SelectedBusiness,
      },
    });
    return await modal.present();
  }
}
