import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-mostrar-viaje',
  templateUrl: './mostrar-viaje.component.html',
  styleUrls: ['./mostrar-viaje.component.scss'],
})
export class MostrarViajeComponent implements OnInit {
  p: number = 1;
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen1 = false;

  setOpen1(isOpen1: boolean) {
    this.isModalOpen1 = isOpen1;
  }

  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  viajeList: any = [];

  waypoints = [];

  modalTitle: string = '';
  Activate_CrearEditar_ViajeComp: boolean = false;
  Activate_Mapa_ViajeComp: boolean = false;
  viaje: any;

  inicioFilter: string = '';
  listWithoutFilter: any = [];
  almacenamiento: any = [];
  capacidad: any = [];

  nombre: string = '';
  sucursal: string = '';

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre')!.toUpperCase();
    this.sucursal = localStorage.getItem('sucursal')!;
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
      nombre: '',
      sucursal: '',
    };
    this.modalTitle = 'Agregar Viaje';
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
    this.modalTitle = 'Actualizar Viaje';
    this.Activate_CrearEditar_ViajeComp = true;
    this.setOpen(true);
    this.refreshViajeList();
  }

  delete(item: any) {
    if (confirm('¿Desea eliminar este viaje?')) {
      this.service.disponibleCamion(item.camion).subscribe(() => {});
      this.service.disponibleUsuario(item.usuario).subscribe(() => {});
      this.service.noAsignarMercancia(item.id).subscribe(()=>{})
      this.service.eliminarViaje(item.id).subscribe((data) => {
        this.interaction.presentToast('top', data.toString());
        this.refreshViajeList();
      });
    }
  }

  refreshViajeList() {
    let valor = localStorage.getItem('sucursal')!;
    this.service.buscarViaje(valor.replace('_', ' ')).subscribe((data: any) => {
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
    var inicioFilter = this.inicioFilter;

    this.viajeList = this.listWithoutFilter.filter(function (el: any) {
      return el.inicio
        .toString()
        .toLowerCase()
        .includes(inicioFilter.toString().trim().toLowerCase());
    });
  }

  map(item: any) {
    this.setOpen1(true);
    this.Activate_Mapa_ViajeComp = true;
    this.viaje = item;
  }
}
