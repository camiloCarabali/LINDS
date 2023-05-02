import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.component.html',
  styleUrls: ['./mostrar-usuario.component.scss'],
})
export class MostrarUsuarioComponent  implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private service: SharedService) { }

  usuarioList: any = [];

  modalTitle: string = '';
  ActivateCrearEditarUsuarioComp: boolean = false;
  usuario: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  ngOnInit() {
    this.refreshUsuarioList();
  }

  cancel() {
    this.ActivateCrearEditarUsuarioComp = false;
    this.modal.dismiss(null, 'cancel');
    this.refreshUsuarioList();
  }

  add() {
    this.usuario = {
      id: 0,
      cedula: '',
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      rol: '',
      empresa: '',
      sucursal: '',
    };
    this.modalTitle = 'Añadir Usuario';
    this.ActivateCrearEditarUsuarioComp = true;
    this.setOpen(true);
  }

  edit(item: any) {
    this.usuario = item;
    this.modalTitle = 'Editar Usuario';
    this.ActivateCrearEditarUsuarioComp = true;
    this.setOpen(true);
    this.refreshUsuarioList();
  }

  delete(item: any) {
    console.log(item.id);
    if (confirm('Desea inactivar este usuario?')) {
      this.service.inactivarUsuario(item.cedula).subscribe((data) => {
        alert(data.toString());
        this.refreshUsuarioList();
      });
    }
  }

  refreshUsuarioList() {
    this.service.getUsuarioList().subscribe((data) => {
      this.usuarioList = data;
      this.listWithoutFilter = data;
    });
  }

  FilterFn() {
    var nombreFilter = this.nombreFilter;
    this.usuarioList = this.listWithoutFilter.filter(function (el: any) {
      return el.nombre
        .toString()
        .toLowerCase()
        .includes(nombreFilter.toString().trim().toLowerCase());
    });
  }
}