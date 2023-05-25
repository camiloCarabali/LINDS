import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-camion',
  templateUrl: './mostrar-camion.component.html',
  styleUrls: ['./mostrar-camion.component.scss'],
})
export class MostrarCamionComponent implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private service: SharedService) {}

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
    this.camion = {
      id: 0,
      matricula: '',
      modelo: '',
      color: '',
      capacidad: '',
      empresa: '',
      sucursal: '',
    };
    this.modalTitle = 'Agregar Vehículo';
    this.Activate_CrearEditar_CamionComp = true;
    this.setOpen(true);
  }

  cancel() {
    this.Activate_CrearEditar_CamionComp = false;
    this.setOpen(false)
    this.refreshCamionList();
  }

  edit(item: any) {
    this.camion = item;
    this.modalTitle = 'Actualizar Vehículo';
    this.Activate_CrearEditar_CamionComp = true;
    this.setOpen(true);
    this.refreshCamionList();
  }

  delete(item: any) {
    if (confirm('¿Desea eliminar este Vehículo?')) {
      this.service.eliminarCamion(item.matricula).subscribe((data) => {
        alert(data.toString());
        this.refreshCamionList();
      });
    }
  }

  refreshCamionList() {
    this.service.getCamionList().subscribe((data) => {
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
