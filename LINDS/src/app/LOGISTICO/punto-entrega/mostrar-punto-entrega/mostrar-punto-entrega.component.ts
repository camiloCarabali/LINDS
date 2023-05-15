import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

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

  constructor(private service: SharedService) {}

  puntoEntregaList: any = [];

  modalTitle: string = '';
  Activate_CrearEditar_PuntoEntregaComp: boolean = false;
  puntoEntrega: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  ngOnInit() {
    this.refreshPuntoEntregaList();
  }

  add() {
    this.puntoEntrega = {
      id: 0,
      direccion: '',
      nombre: '',
      peso: '',
      viaje: '',
      estado: '',
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
        alert(data.toString());
        this.refreshPuntoEntregaList();
      });
    }
  }

  activate(item: any) {
    if (confirm('Desea activar este punto de entrega?')) {
      this.service.activarPuntoEntrega(item.id).subscribe((data) => {
        alert(data.toString());
        this.refreshPuntoEntregaList();
      });
    }
  }

  refreshPuntoEntregaList() {
    this.service.getPuntoEntregaList().subscribe((data) => {
      this.puntoEntregaList = data;
      this.listWithoutFilter = data;
    });
  }

  FilterFn() {
    var nombreFilter = this.nombreFilter;
    this.puntoEntregaList = this.listWithoutFilter.filter(function (el: any) {
      return el.nombre
        .toString()
        .toLowerCase()
        .includes(nombreFilter.toString().trim().toLowerCase());
    });
  }
}
