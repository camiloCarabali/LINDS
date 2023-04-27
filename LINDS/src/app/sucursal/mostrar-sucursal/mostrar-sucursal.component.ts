import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-sucursal',
  templateUrl: './mostrar-sucursal.component.html',
  styleUrls: ['./mostrar-sucursal.component.scss'],
})
export class MostrarSucursalComponent implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  
  constructor(private service: SharedService) {}

  sucursalList: any = [];
  nombreEmpresas: any = [];
  nombreMunicipio: any = [];

  ngOnInit() {
    this.refreshSucursalList();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.refreshSucursalList();
  }

  refreshSucursalList() {
    this.service.getSucursalList().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.service.getBuscarEmpresa(data[i].empresa).subscribe((data) => {
          this.nombreEmpresas.push(data);
          this.sucursalList[i].empresa = this.nombreEmpresas[i].nombre;
        });
        this.service.getBuscarMunicipio(data[i].municipio).subscribe((data) => {
          this.nombreMunicipio.push(data)
          this.sucursalList[i].municipio = this.nombreMunicipio[i].nombre;
        })
      }
      this.sucursalList = data;
    });
  }


}
