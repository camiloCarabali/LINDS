import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-mostrar-sucursal',
  templateUrl: './mostrar-sucursal.component.html',
  styleUrls: ['./mostrar-sucursal.component.scss'],
})
export class MostrarSucursalComponent implements OnInit {
  p: number = 1;
  
  @ViewChild(IonModal)
  modal!: IonModal;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private service: SharedService,
    private router: Router,
    private interaction: UiServiceService
  ) {}

  sucursalList: any = [];

  modalTitle: string = '';
  ActivateCrearEditarSucursalComp: boolean = false;
  sucursal: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  nombre: string = '';

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre')!.toUpperCase();
    this.refreshSucursalList();
  }

  cancel() {
    this.ActivateCrearEditarSucursalComp = false;
    this.setOpen(false);
    this.refreshSucursalList();
  }

  add() {
    this.sucursal = {
      id: 0,
      nombre: '',
      empresa: '',
      direccion: '',
      departamento: '',
      municipio: '',
    };
    this.modalTitle = 'Añadir Sucursal';
    this.ActivateCrearEditarSucursalComp = true;
    this.setOpen(true);
  }

  edit(item: any) {
    this.sucursal = item;
    this.modalTitle = 'Editar Sucursal';
    this.ActivateCrearEditarSucursalComp = true;
    this.setOpen(true);
    this.refreshSucursalList();
  }

  delete(item: any) {
    if (confirm('Desea inactivar esta sucursal?')) {
      this.service.inactivarSucursal(item.id).subscribe((data) => {
        this.interaction.presentToast('top', data.toString());
        this.refreshSucursalList();
      });
    }
  }

  refreshSucursalList() {
    this.service.getSucursalList().subscribe((data) => {
      this.sucursalList = data;
      this.listWithoutFilter = data;
    });
  }

  FilterFn() {
    var nombreFilter = this.nombreFilter;
    this.sucursalList = this.listWithoutFilter.filter(function (el: any) {
      return el.nombre
        .toString()
        .toLowerCase()
        .includes(nombreFilter.toString().trim().toLowerCase());
    });
  }
}
