import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.component.html',
  styleUrls: ['./mostrar-usuario.component.scss'],
})
export class MostrarUsuarioComponent implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private service: SharedService, private interaction: UiServiceService) {}

  usuarioList: any = [];

  modalTitle: string = '';
  ActivateCrearEditarUsuarioComp: boolean = false;
  usuario: any;

  nombreFilter: string = '';
  listWithoutFilter: any = [];

  nombre: string = '';

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre')!.toUpperCase();
    this.refreshUsuarioList();
  }

  cancel() {
    this.ActivateCrearEditarUsuarioComp = false;
    this.setOpen(false);
    this.refreshUsuarioList();
  }

  add() {
    this.usuario = {
      id: 0,
      cedula: '',
      nombre: '',
      apellido: '',
      correo: '',
      rol: '',
      sucursal: '',
      disponiblidad: ''
    };
    this.modalTitle = 'Añadir Usuario';
    this.ActivateCrearEditarUsuarioComp = true;
    this.setOpen(true);
    this.refreshUsuarioList();
  }

  edit(item: any) {
    this.usuario = item;
    console.log(this.usuario)
    this.modalTitle = 'Editar Usuario';
    this.ActivateCrearEditarUsuarioComp = true;
    this.setOpen(true);
    this.refreshUsuarioList();
  }

  delete(item: any) {
    if (confirm('Desea inactivar este usuario?')) {
      this.service.inactivarUsuario(item.cedula).subscribe((data) => {
        this.interaction.presentToast('top', data.toString());
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
