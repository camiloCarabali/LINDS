import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-crear-editar-empresa',
  templateUrl: './crear-editar-empresa.component.html',
  styleUrls: ['./crear-editar-empresa.component.scss'],
})

export class CrearEditarEmpresaComponent  implements OnInit {

  constructor(private service: SharedService, private interaction: UiServiceService) { }

  paisList: any = []

  @Input() empresa: any;
  id: string = '';
  nombre: string = '';
  NIT: string = '';
  pais: any;

  ngOnInit() {
    this.id = this.empresa.id;
    this.nombre = this.empresa.nombre;
    this.NIT = this.empresa.NIT;
    this.pais = this.empresa.pais;
    this.loadPaises();
  }

  add() {
    var val = {
      id: this.id,
      nombre: this.nombre,
      NIT: this.NIT,
      pais: this.pais,
    };
    this.service.addEmpresa(val).subscribe((res) => {
      this.interaction.presentToast('top', res.toString());
    });
  }

  edit(){
    var val = {
      NIT: this.NIT,
      nombre: this.nombre,
      pais: this.pais,
    };
    this.service.updateEmpresa(val).subscribe((res) => {
      this.interaction.presentToast('top', res.toString());
    });
  }

  loadPaises() {
    this.service.getPaisList().subscribe((data) => {
      this.paisList = data;
    });
  }

}
