import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-crear-editar-camion',
  templateUrl: './crear-editar-camion.component.html',
  styleUrls: ['./crear-editar-camion.component.scss'],
})
export class CrearEditarCamionComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  constructor(
    private service: SharedService,
    private interaction: UiServiceService
  ) {}

  empresaList: any = [];
  sucursalList: any = [];
  camionList: any = [];

  @Input() camion: any;
  id: string = '';
  matricula: string = '';
  modelo: string = '';
  tipo: string = '';
  color: string = '';
  capacidad: string = '';
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
    var regex = new RegExp('([A-Z]){3}[0-9]{3}');

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

    if (regex.test(val.matricula)) {
      if (
        ![val.matricula, val.modelo, val.tipo, val.color, val.capacidad].every(
          Boolean
        )
      ) {
        this.interaction.presentToast(
          'top',
          'Por favor llenar todos los campos'
        );
      } else {
        if (confirm('¿Desea agregar un nuevo vehiculo?')) {
          this.service.addCamion(val).subscribe((res: any) => {
            this.interaction.presentToast('top', res.toString());
          });
        }
      }
    } else {
      this.interaction.presentToast(
        'top',
        'La matricula tiene que estar en este formato "AAA000"'
      );
    }
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
      this.service.updateCamion(val).subscribe((res: any) => {
        this.interaction.presentToast('top', res.toString());
      });
    }
  }

  refreshCamionList() {
    let valor = (this.sucursal = localStorage.getItem('sucursal')!);
    this.service.getBuscarCamion(valor.replace(/ /g, '_')).subscribe((data) => {
      this.camionList = data;
    });
  }
}
