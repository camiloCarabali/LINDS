import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Empresa, Sucursal } from 'app/models/models';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-modificar-sucursal',
  templateUrl: './modificar-sucursal.page.html',
  styleUrls: ['./modificar-sucursal.page.scss'],
})
export class ModificarSucursalPage implements OnInit {
  @Input() branch;

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
    this.sucursal.empresa = this.branch.empresa;
    this.sucursal.nombre = this.branch.nombre;
    this.sucursal.ciudad = this.branch.ciudad;
    this.sucursal.direccion = this.branch.direccion;
    this.mostrarEmpresas();
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

  async modificarSucursal(id) {
    this.interaction.showLoading('creando...');
    id = this.branch.id;
    const path = 'Sucursales';
    this.firestore
      .update(this.sucursal, path, id)
      .then((res) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Sucursal modificada con exito');
        this.dismiss();
      })
      .catch((err) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error al modificar');
      });
  }
}
