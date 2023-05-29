import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

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

  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  mercanciaList: any = [];

  modalTitle: string = '';
  Activate_CrearEditar_MercanciaComp: boolean = false;
  mercancia: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  nombre: string = '';
  sucursal: string = '';

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre')!.toUpperCase();
    this.sucursal = localStorage.getItem('sucursal')!;
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
      empresa: '',
      sucursal: '',
    };
    this.modalTitle = 'Agregar Mercancia';
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
    this.modalTitle = 'Actualizar Mercancia';
    this.Activate_CrearEditar_MercanciaComp = true;
    this.setOpen(true);
    this.refreshMercanciaList();
  }

  carga(item: any) {
    this.service.cargaMercancia(item.id).subscribe((data) => {
      if (data.status === 200) {
        this.interaction.presentToast(
          'top',
          'La carga ha sido descargada correctamente.'
        );
      } else if (data.status === 404) {
        this.interaction.closeLoading();
        this.interaction.presentToast('top', 'Error en la solicitud');
      }
    });
    location.reload();
  }

  delete(item: any) {
    if (confirm('¿Desea eliminar esta mercancia?')) {
      this.service.eliminarMercancia(item.id).subscribe((data) => {
        alert(data.toString());
        this.refreshMercanciaList();
      });
    }
  }

  refreshMercanciaList() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service
      .mostrarMercanciaSucursal(valor.replace(/ /g, '_'))
      .subscribe((data) => {
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
