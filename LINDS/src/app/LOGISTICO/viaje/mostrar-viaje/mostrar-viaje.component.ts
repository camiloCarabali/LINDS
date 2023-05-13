import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-viaje',
  templateUrl: './mostrar-viaje.component.html',
  styleUrls: ['./mostrar-viaje.component.scss'],
})
export class MostrarViajeComponent implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen1 = false;

  setOpen1(isOpen1: boolean) {
    this.isModalOpen1 = isOpen1;
  }

  constructor(private service: SharedService) {}

  viajeList: any = [];

  waypoints = [];

  modalTitle: string = '';
  Activate_CrearEditar_ViajeComp: boolean = false;
  Activate_Mapa_ViajeComp: boolean = false;
  viaje: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];
  almacenamiento: any = [];
  capacidad: any = [];

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
    this.setOpen(false);
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
    this.service.getViajeList().subscribe((data: any) => {
      this.viajeList = data;
      this.listWithoutFilter = data;
      for (let peso of this.viajeList) {
        this.almacenamiento = [
          {
            matricula: peso.camion,
          },
        ];
      }

      for (let item of this.almacenamiento) {
        this.buscarPeso(item.matricula);
      }
    });
  }

  buscarPeso(matricula: any) {
    this.service.getBuscarPeso(matricula).subscribe((data: any) => {
      this.capacidad = [data];
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

  map(item: any) {
    this.setOpen1(true);
    this.Activate_Mapa_ViajeComp = true;
    this.viaje = item;
  }
}
