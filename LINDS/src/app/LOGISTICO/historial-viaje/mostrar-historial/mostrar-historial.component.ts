import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-historial',
  templateUrl: './mostrar-historial.component.html',
  styleUrls: ['./mostrar-historial.component.scss'],
})
export class MostrarHistorialComponent implements OnInit {
  viajeList: any = [];
  capacidad: any = [];

  nombreFilter: string = '';
  listWithoutFilter: any =[];

  constructor(private service: SharedService) {}

  ngOnInit() {
    this.refreshViajeList();
  }

  refreshViajeList() {
    this.service.getViajeList().subscribe((data) => {
      this.viajeList = data;
    });
  }

  FilterFn(){
    var nameFilter = this.nombreFilter;
    this.viajeList = this.listWithoutFilter.filter(function (el:any){
      return el.nombre
      .toString()
      .toLowerCase()
      .includes(nameFilter.toString().trim().toLowerCase());
    });
  }

}
