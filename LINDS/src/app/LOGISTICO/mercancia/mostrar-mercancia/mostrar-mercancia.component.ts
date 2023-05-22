import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-mercancia',
  templateUrl: './mostrar-mercancia.component.html',
  styleUrls: ['./mostrar-mercancia.component.scss'],
})
export class MostrarMercanciaComponent implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private service: SharedService) {}

  mercanciaList: any = [];

  modalTitle: string = '';
  Activate_CrearEditar_MercanciaComp: boolean = false;
  mercancia: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  ngOnInit() {
    this.refreshMercanciaList();
  }

  add() {
    this.mercancia = {
      id: 0,
      nombre: '',
      peso: '',
      estado: '',
      carga: '',
      descarga: '',
      puntoEntrega: '',
    };
    this.modalTitle = 'Añadir Mercancia';
    this.Activate_CrearEditar_MercanciaComp = true;
    this.setOpen(true);
  }

  cancel() {
    this.Activate_CrearEditar_MercanciaComp = false;
    this.setOpen(false);
    this.refreshMercanciaList();
  }

  edit(item: any) {
    this.mercancia = item;
    this.modalTitle = 'Editar Mercancia';
    this.Activate_CrearEditar_MercanciaComp = true;
    this.setOpen(true);
    this.refreshMercanciaList();
  }

  delete(item: any) {
    if (confirm('Desea eliminar esta mercancia?')) {
      this.service.eliminarMercancia(item.id).subscribe((data) => {
        alert(data.toString());
        this.refreshMercanciaList();
      });
    }
  }

  refreshMercanciaList() {
    this.service.getMercanciaList().subscribe((data) => {
      this.mercanciaList = data;
      this.listWithoutFilter = data;
    });
  }

  FilterFn() {
    var nombreFilter = this.nombreFilter;
    this.mercanciaList = this.listWithoutFilter.filter(function (el: any) {
      return el.nombre
        .toString()
        .toLowerCase()
        .includes(nombreFilter.toString().trim().toLowerCase());
    });
  }
}