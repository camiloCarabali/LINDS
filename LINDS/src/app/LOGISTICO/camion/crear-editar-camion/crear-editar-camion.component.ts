import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-crear-editar-camion',
  templateUrl: './crear-editar-camion.component.html',
  styleUrls: ['./crear-editar-camion.component.scss'],
})
export class CrearEditarCamionComponent implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  empresaList: any = [];
  sucursalList: any = [];

  @Input() camion: any;
  id: string = '';
  matricula: string = '';
  modelo: string = '';
  tipo: string = '';
  color: string = '';
  capacidad: number = 0;
  empresa: any;
  sucursal: any;
  estado: boolean = true;

  ngOnInit() {
    this.id = this.camion.id;
    this.matricula = this.camion.matricula;
    this.modelo = this.camion.modelo;
    this.tipo = this.camion.tipo;
    this.color = this.camion.color;
    this.capacidad = this.camion.capacidad;
    this.empresa = this.camion.empresa;
    this.sucursal = this.camion.sucursal;
    this.estado = this.camion.estado;
  }

  add() {
    var val = {
      matricula: this.matricula,
      modelo: this.modelo,
      tipo: this.tipo,
      color: this.color,
      capacidad: this.capacidad,
      empresa: localStorage.getItem('empresa'),
      sucursal: localStorage.getItem('sucursal'),
      estado: true,
    };
    
    if (confirm('¿Desea agregar un nuevo vehiculo?'))
      this.service.addCamion(val).subscribe((res: any) => {
        this.interaction.presentToast('top', res.toString());
        setTimeout(function () {
          location.reload();
        }, 1000);
      });
      
  }

  edit() {
    var val = {
      matricula: this.matricula,
      modelo: this.modelo,
      tipo: this.tipo,
      color: this.color,
      capacidad: this.capacidad,
      empresa: this.empresa,
      sucursal: this.sucursal,
      estado: this.estado,
    };
    if (confirm('¿Desea actualizar la información del vehiculo?')) {
      this.service.updateCamion(val).subscribe((res) => {
        this.interaction.presentToast('top', res.toString());
        setTimeout(function () {
          location.reload();
        }, 1000);
      });
    }
  }
}
