import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Empresa, Sucursal } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { CrearSucursalPage } from '../crear-sucursal/crear-sucursal.page';
import { ModificarSucursalPage } from '../modificar-sucursal/modificar-sucursal.page';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.page.html',
  styleUrls: ['./sucursal.page.scss'],
})
export class SucursalPage implements OnInit {
  susursal: Sucursal = {
    empresa: null,
    nombre: null,
    ciudad: null,
    direccion: null,
  };

  sucursales = [];

  constructor(
    private firestore: FirestoreService,
    public modalCtrl: ModalController,
    private interaction: UiServiceService,
  ) {}

  ngOnInit() {
    this.mostrarSucursales();
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

  async eliminarSucursal(id) {
    const path = 'Sucursales';
    this.interaction.showLoading('eliminando...');
    this.firestore
      .delete(path, id)
      .then((res) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Sucursal eliminada con exito.');
      })
      .catch((err) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error al eliminar.');
      });
  }

  async showModalCreate() {
    const modal = await this.modalCtrl.create({
      component: CrearSucursalPage,
    });
    return await modal.present();
  }

  async showModalUpdate(SelectedBranch) {
    const modal = await this.modalCtrl.create({
      component: ModificarSucursalPage,
      componentProps: {
        branch: SelectedBranch,
      },
    });
    return await modal.present();
  }

}
