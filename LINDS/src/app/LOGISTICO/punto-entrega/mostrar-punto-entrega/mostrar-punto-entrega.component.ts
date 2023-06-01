import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-mostrar-punto-entrega',
  templateUrl: './mostrar-punto-entrega.component.html',
  styleUrls: ['./mostrar-punto-entrega.component.scss'],
})
export class MostrarPuntoEntregaComponent implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  puntoEntregaList: any = [];

  estadoViajes: any = [];
  estadoViajes1: any = [];

  modalTitle: string = '';
  Activate_CrearEditar_PuntoEntregaComp: boolean = false;
  puntoEntrega: any;

  direccionFilter: string = '';
  listWithoutFilter: any = [];

  nombre: string = '';
  sucursal: string = '';

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre')!.toUpperCase();
    this.sucursal = localStorage.getItem('sucursal')!;
    this.refreshPuntoEntregaList();
  }

  add() {
    this.puntoEntrega = {
      id: 0,
      direccion: '',
      viaje: '',
      estado: '',
      empresa: '',
      sucursal: '',
    };
    this.modalTitle = 'Crear Punto de Entrega';
    this.Activate_CrearEditar_PuntoEntregaComp = true;
    this.setOpen(true);
  }

  cancel() {
    this.Activate_CrearEditar_PuntoEntregaComp = false;
    this.setOpen(false);
    this.refreshPuntoEntregaList();
  }

  edit(item: any) {
    this.puntoEntrega = item;
    this.modalTitle = 'Editar Punto de Entrega';
    this.Activate_CrearEditar_PuntoEntregaComp = true;
    this.setOpen(true);
    this.refreshPuntoEntregaList();
  }

  delete(item: any) {
    if (confirm('Desea eliminar este punto de entrega?')) {
      this.service.eliminarPuntoEntrega(item.id).subscribe((data) => {
        this.interaction.presentToast('top', data.toString());
        this.refreshPuntoEntregaList();
      });
    }
  }

  activate(item: any) {
    if (confirm('Desea activar este punto de entrega?')) {
      this.service.activarPuntoEntrega(item.id).subscribe((data) => {
        this.interaction.presentToast('top', data.toString());
        this.refreshPuntoEntregaList();
      });
    }
  }

  refreshPuntoEntregaList() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service
      .buscarPuntoEntregaSucursal(valor.replace(/ /g, '_'))
      .subscribe((data) => {
        this.puntoEntregaList = data;
        this.listWithoutFilter = data;
        /*
        for (let i of this.puntoEntregaList) {
          this.service.infoViaje(i.viaje).subscribe((res) => {
            this.estadoViajes.push(res[0]);
          });
        }
        console.log(this.estadoViajes);
        */
      });
  }

  FilterFn() {
    var direccionFilter = this.direccionFilter;
    this.puntoEntregaList = this.listWithoutFilter.filter(function (el: any) {
      return el.direccion
        .toString()
        .toLowerCase()
        .includes(direccionFilter.toString().trim().toLowerCase());
    });
  }
}
