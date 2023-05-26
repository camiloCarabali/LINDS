import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-lista-conductores',
  templateUrl: './mostrar-lista-conductores.component.html',
  styleUrls: ['./mostrar-lista-conductores.component.scss'],
})
export class MostrarListaConductoresComponent implements OnInit {
  constructor(private service: SharedService) {}

  conductorList: any = [];

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  nombre: string = '';
  sucursal: string = '';

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre')!.toUpperCase();
    this.sucursal = localStorage.getItem('sucursal')!;
    this.refreshConductorList();
  }

  refreshConductorList() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service
      .getBuscarConductor(valor.replace(/ /g, '_'))
      .subscribe((data: any) => {
        this.conductorList = data;
        this.listWithoutFilter = data;
      });
  }

  FilterFn() {
    var nombreFilter = this.nombreFilter;

    this.conductorList = this.listWithoutFilter.filter(function (el: any) {
      return el.nombre
        .toString()
        .toLowerCase()
        .includes(nombreFilter.toString().trim().toLowerCase());
    });
  }
}
