import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-viaje',
  templateUrl: './mostrar-viaje.component.html',
  styleUrls: ['./mostrar-viaje.component.scss'],
})
export class MostrarViajeComponent  implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private service: SharedService) { }

  viajeList: any = [];

  modalTitle: string = '';
  Activate_CrearEditar_ViajeComp: boolean = false;
  viaje: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  ngOnInit() {
    this.refreshViajeList();
  }

  add() {
    this.viaje = {
      id: 0,
      inicio: '',
      fecha: '',
      camion: '',
      usuario: '',
      estado: '',
    };
    this.modalTitle = 'Crear Viaje';
    this.Activate_CrearEditar_ViajeComp = true;
    this.setOpen(true);
  }

  cancel() {
    this.Activate_CrearEditar_ViajeComp = false;
    this.setOpen(false)
    this.refreshViajeList();
  }

  edit(item: any) {
    this.viaje = item;
    this.modalTitle = 'Editar Viaje';
    this.Activate_CrearEditar_ViajeComp = true;
    this.setOpen(true);
    this.refreshViajeList();
  }

  delete(item: any) {
    if (confirm('Desea inactivar este viaje?')) {
      this.service.inactivarViaje(item.id).subscribe((data) => {
        alert(data.toString());
        this.refreshViajeList();
      });
    }
  }

  refreshViajeList() {
    this.service.getViajeList().subscribe((data) => {
      this.viajeList = data;
      this.listWithoutFilter = data;
    });
  }

  FilterFn() {
    var nombreFilter = this.nombreFilter;
    this.viajeList = this.listWithoutFilter.filter(function (el: any) {
      return el.nombre
        .toString()
        .toLowerCase()
        .includes(nombreFilter.toString().trim().toLowerCase());
    });
  }


}
