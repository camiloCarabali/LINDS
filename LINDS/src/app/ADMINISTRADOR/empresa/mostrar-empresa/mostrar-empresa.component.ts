import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-empresa',
  templateUrl: './mostrar-empresa.component.html',
  styleUrls: ['./mostrar-empresa.component.scss'],
})
export class MostrarEmpresaComponent  implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  isModalOpen = false;

  setOpen(isOpen: boolean){
    this.isModalOpen = isOpen
  }

  constructor(private service: SharedService, private router: Router) { }

  empresaList: any = [];

  modalTitle: string = '';
  Activate_CrearEditar_EmpresaComp: boolean = false;
  empresa: any;

  nombreFilter: string = '';
  listWithoutFilter: any =[];

  nombre: string = '';

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre')!.toUpperCase();
    this.refreshEmpresaList();
  }

  add(){
    this.empresa ={
      id: 0,
      nombre: '',
      NIT: '',
      pais: '',
    };
    this.modalTitle = 'Registrar Empresa';
    this.Activate_CrearEditar_EmpresaComp = true;
    this.setOpen(true);
  }

  edit(item: any){
    this.empresa = item;
    this.modalTitle = 'Actualizar Empresa';
    this.Activate_CrearEditar_EmpresaComp = true;
    this.setOpen(true);
    this.refreshEmpresaList();
  }

  inactive(item: any){
    if(confirm('¿Desea inactivar esta empresa?')){
      this.service.inactivarEmpresa(item.NIT).subscribe((data) => {
        alert(data.toString());
      });
    }
  }

  cancel() {
    this.Activate_CrearEditar_EmpresaComp = false;
    this.setOpen(false);
    this.refreshEmpresaList();
  }

  refreshEmpresaList(){
    this.service.getEmpresaList().subscribe((data) => {
      this.empresaList = data;
      this.listWithoutFilter = data;
    });
  }

  FilterFn(){
    var nameFilter = this.nombreFilter;
    this.empresaList = this.listWithoutFilter.filter(function (el:any){
      return el.nombre
      .toString()
      .toLowerCase()
      .includes(nameFilter.toString().trim().toLowerCase());
    });
  }

}
