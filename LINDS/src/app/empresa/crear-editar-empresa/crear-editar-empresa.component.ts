import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-crear-editar-empresa',
  templateUrl: './crear-editar-empresa.component.html',
  styleUrls: ['./crear-editar-empresa.component.scss'],
})

export class CrearEditarEmpresaComponent  implements OnInit {

  constructor(private service: SharedService) { }

  paisList: any = []

  @Input() empresa: any;
  id: string = '';
  nombre: string = '';
  nit: string = '';
  pais: any;

  ngOnInit() {
    this.id = this.empresa.id;
    this.nombre = this.empresa.nombre;
    this.nit = this.empresa.nit;
    this.pais = this.empresa.pais;
    this.loadPaises();
  }

  add() {
    var val = {
      id: this.id,
      nombre: this.nombre,
      nit: this.nit,
      pais: this.pais,
    };
    this.service.addEmpresa(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  edit(){
    var val = {
      id: this.id,
      nombre: this.nombre,
      nit: this.nit,
      pais: this.pais,
    };
    this.service.updateEmpresa(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  loadPaises() {
    this.service.getPaisList().subscribe((data) => {
      this.paisList = data;
    });
  }

}
