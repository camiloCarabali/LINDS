import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { UiService } from 'src/services/ui.service';

@Component({
  selector: 'app-mostrar-mercancia',
  templateUrl: './mostrar-mercancia.component.html',
  styleUrls: ['./mostrar-mercancia.component.scss'],
})
export class MostrarMercanciaComponent implements OnInit {
  mercanciaList: any = [];

  @Input() mercancia: any;
  id: string = '';
  direccion: string = '';

  constructor(private service: SharedService, private interaction: UiService) {}

  ngOnInit() {
    this.id = this.mercancia.direccion;
    this.direccion = this.mercancia.direccion;
    this.getMercancia();
  }

  getMercancia() {
    const valor = this.direccion.replace('#', 'AA');

    this.service.buscarMercancia(valor.replace(/ /g, '_')).subscribe((data) => {
      this.mercanciaList = data;
    });
  }

  async descarga(id: string) {
    await this.interaction.showLoading('Validando...');
    this.service.descargaMercancia(id).subscribe((data) => {
      if (data.status === 200) {
        this.interaction.closeLoading();
        this.interaction.presentToast(
          'top',
          'La carga ha sido descargada correctamente.'
        );
      }else if(data.status === 404){
        this.interaction.closeLoading();
        this.interaction.presentToast(
          'top',
          'Error en la solicitud'
        );
      }
    });
  }
}
