import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-mostrar-camion',
  templateUrl: './mostrar-camion.component.html',
  styleUrls: ['./mostrar-camion.component.scss'],
})
export class MostrarCamionComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  p: number = 1;

  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  camionList: any = [];

  modalTitle: string = '';
  Activate_CrearEditar_CamionComp: boolean = false;
  camion: any;

  modeloFilter: string = '';
  listWithoutFilter: any = [];

  nombre: string = '';
  sucursal: string = '';

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre')!.toUpperCase();
    this.sucursal = localStorage.getItem('sucursal')!;
    this.refreshCamionList();
  }

  add() {
    this.modal.present();
    this.camion = {
      id: 0,
      matricula: '',
      modelo: '',
      color: '',
      capacidad: '',
      empresa: '',
      sucursal: '',
      estado: '',
    };
    this.modalTitle = 'Agregar Vehículo';
    this.Activate_CrearEditar_CamionComp = true;
  }

  cancel() {
    this.Activate_CrearEditar_CamionComp = false;
    this.modal.dismiss();
    this.refreshCamionList();
  }

  edit(item: any) {
    this.modal.present();
    this.camion = item;
    this.modalTitle = 'Actualizar Vehículo';
    this.Activate_CrearEditar_CamionComp = true;
    this.refreshCamionList();
  }

  delete(item: any) {
    if (confirm('¿Desea eliminar este Vehículo?')) {
      this.service.eliminarCamion(item.matricula).subscribe((data) => {
        this.interaction.presentToast('top', data.toString());
        this.refreshCamionList();
      });
    }
  }

  refreshCamionList() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service.getBuscarCamion(valor.replace(/ /g, '_')).subscribe((data) => {
      this.camionList = data;
      this.listWithoutFilter = data;
    });
  }

  FilterFn() {
    var modeloFilter = this.modeloFilter;
    this.camionList = this.listWithoutFilter.filter(function (el: any) {
      return el.modelo
        .toString()
        .toLowerCase()
        .includes(modeloFilter.toString().trim().toLowerCase());
    });
  }
}
