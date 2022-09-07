import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Empresa, Sucursal } from 'app/models/models';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-crear-sucursal',
  templateUrl: './crear-sucursal.page.html',
  styleUrls: ['./crear-sucursal.page.scss'],
})
export class CrearSucursalPage implements OnInit {
  sucursal: Sucursal = {
    empresa: null,
    nombre: null,
    ciudad: null,
    direccion: null,
  };

  empresa: Empresa = {
    nombre: null,
    nit: null,
  };

  empresas = [];

  constructor(
    public modalCtrl: ModalController,
    private firestore: FirestoreService,
    private interaction: UiServiceService
  ) {}

  ngOnInit() {
    this.mostrarEmpresas();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  validacion() {
    return this.sucursal.empresa == null ||
      this.sucursal.nombre == null ||
      this.sucursal.ciudad == null ||
      this.sucursal.direccion == null
      ? false
      : true;
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

  async crearSucursal() {
    this.interaction.showLoading('creando...');
    if (this.validacion()) {
      const path = "Sucursales";
      await this.firestore
        .create(this.sucursal, path)
        .then((res) => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Sucursal registrada con exito');
          this.dismiss();
        })
        .catch((err) => {
          this.interaction.closeLoading();
          this.interaction.presentToast('Error al registrar');
        });
    } else {
      this.interaction.closeLoading();
      this.interaction.alertaInformativa('Los campos no pueden estar vacios');
    }
  }
}
