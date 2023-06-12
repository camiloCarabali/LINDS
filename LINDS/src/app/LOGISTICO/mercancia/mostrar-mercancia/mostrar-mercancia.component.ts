import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-mostrar-mercancia',
  templateUrl: './mostrar-mercancia.component.html',
  styleUrls: ['./mostrar-mercancia.component.scss'],
})
export class MostrarMercanciaComponent implements OnInit {
  p: number = 1;
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen1 = false;

  setOpen1(isOpen: boolean) {
    this.isModalOpen1 = isOpen;
  }

  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  mercanciaList: any = [];

  modalTitle: string = '';
  Activate_CrearEditar_MercanciaComp: boolean = false;
  Activate_Mapa_MercanciaComp: boolean = false;
  mercancia: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];
  punto: any;

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
      puntoInicio: '',
      nombre: '',
      peso: '',
      altura: '',
      ancho: '',
      largo: '',
      volumen: '',
      puntoEntrega: '',
      destinatario: '',
      telefonoDestinatario: '',
      correoDestinatario: '',
      remitente: '',
      correoRemitente: '',
      telefonoRemitente: '',
      estado: '',
      carga: '',
      fechaCarga: '',
      descarga: '',
      fechaDescarga: '',
      empresa: '',
      sucursal: '',
      viaje: '',
    };
    this.modalTitle = 'Recepción de mercancia';
    this.Activate_CrearEditar_MercanciaComp = true;
    this.setOpen(true);
  }

  cancel() {
    this.Activate_CrearEditar_MercanciaComp = false;
    this.setOpen(false);
    this.refreshMercanciaList();
  }

  cancelMapa() {
    this.Activate_Mapa_MercanciaComp = false;
    this.setOpen1(false);
    this.refreshMercanciaList();
  }

  edit(item: any) {
    this.mercancia = item;
    this.modalTitle = 'Actualizar información';
    this.Activate_CrearEditar_MercanciaComp = true;
    this.setOpen(true);
    this.refreshMercanciaList();
  }

  carga(item: any) {
    if (confirm('¿Desea confirmar la carga de la mercancia?')) {
      this.service.cargaMercancia(item.id).subscribe((data) => {
        if (data.status === 200) {
          this.interaction.presentToast(
            'top',
            'La carga ha sido cargada correctamente.'
          );
          this.refreshMercanciaList();
        } else if (data.status === 404) {
          this.interaction.closeLoading();
          this.interaction.presentToast('top', 'Error en la solicitud');
        }
      });
    }
  }

  delete(item: any) {
    if (confirm('¿Desea eliminar esta mercancia?')) {
      this.service.eliminarMercancia(item.id).subscribe((data) => {
        this.interaction.presentToast('top', data.toString());
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

  map(item: any) {
    localStorage.setItem('mercancia', item.puntoEntrega)
    this.setOpen1(true);
    this.Activate_Mapa_MercanciaComp = true;
    this.punto = item;
  }
}
