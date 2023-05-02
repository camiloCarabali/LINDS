import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { IonModal } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

  nameFilter: string = '';
  listWithoutFilter: any =[];

  ngOnInit() {
    this.refreshEmpresaList();
  }

  add(){
    this.empresa ={
      id: 0,
      nombre: '',
      nit: '',
      pais: '',
    };
    this.modalTitle = 'Añadir Empresa';
    this.Activate_CrearEditar_EmpresaComp = true;
    this.setOpen(true);
  }

  edit(item: any){
    this.empresa = item;
    this.modalTitle = 'Editar Empresa';
    this.Activate_CrearEditar_EmpresaComp = true;
    this.setOpen(true);
    this.refreshEmpresaList();
  }

  inactive(item: any){
    console.log(item.id);
    if(confirm('¿Desea inactivar esta empresa?')){
      this.service.inactivarEmpresa(item.id).subscribe((data) => {
        alert(data.toString());
        this.refreshEmpresaList();
      });
    }
  }

  refreshEmpresaList(){
    this.service.getEmpresaList().subscribe((data) => {
      this.empresaList = data;
      this.listWithoutFilter = data;
    });
  }

  filterFn(){
    var nameFilter = this.nameFilter;
    this.empresaList = this.listWithoutFilter.filter(function (el:any){
      return el.nombre
      .toString()
      .toLowerCase()
      .includes(nameFilter.toString().trim().toLowerCase());
    });
  }

  cerrar(){
    this.router.navigate(['/inicio']);
  }

}
