import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { IonModal } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-mostrar-sucursal',
  templateUrl: './mostrar-sucursal.component.html',
  styleUrls: ['./mostrar-sucursal.component.scss'],
})
export class MostrarSucursalComponent implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private service: SharedService) {}

  sucursalList: any = [];
  nombreEmpresas: any = [];
  nombreMunicipio: any = [];

  modalTitle: string = '';
  ActivateCrearEditarSucursalComp: boolean = false;
  sucursal: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  ngOnInit() {
    this.refreshSucursalList();
  }

  cancel() {
    this.ActivateCrearEditarSucursalComp = false;
    this.modal.dismiss(null, 'cancel');
    this.refreshSucursalList();
  }

  add() {
    this.sucursal = {
      id: 0,
      nombre: '',
      empresa: '',
      direccion: '',
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
    console.log(item.id);
    if (confirm('Desea inactivar esta sucursal?')) {
      this.service.inactivarSucursal(item.id).subscribe((data) => {
        alert(data.toString());
        this.refreshSucursalList();
      });
    }
  }

  refreshSucursalList() {
    this.service.getSucursalList().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.service.getBuscarEmpresa(data[i].empresa).subscribe((data) => {
          this.nombreEmpresas.push(data);
          this.sucursalList[i].empresa = this.nombreEmpresas[i].nombre;
          this.listWithoutFilter[i].empresa = this.nombreEmpresas[i].nombre;
        });
        this.service.getBuscarMunicipio(data[i].municipio).subscribe((data) => {
          this.nombreMunicipio.push(data);
          this.sucursalList[i].municipio = this.nombreMunicipio[i].nombre;
          this.listWithoutFilter[i].municipio = this.nombreMunicipio[i].nombre;
        });
      }
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
