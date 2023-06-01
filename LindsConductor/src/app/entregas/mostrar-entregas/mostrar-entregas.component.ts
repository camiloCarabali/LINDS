import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/services/shared.service';
import { UiService } from 'src/services/ui.service';

@Component({
  selector: 'app-mostrar-entregas',
  templateUrl: './mostrar-entregas.component.html',
  styleUrls: ['./mostrar-entregas.component.scss'],
})
export class MostrarEntregasComponent implements OnInit {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  mercancia: any;
  entregas: any = [];

  modalTitle: string = '';
  Activate_Entregas_Comp: boolean = false;

  constructor(
    private service: SharedService,
    private cookieService: CookieService,
    private interaction: UiService
  ) {}

  ngOnInit() {
    this.refreshEntregas();
  }

  async refreshEntregas() {
    let valor = localStorage.getItem('id')!

    this.service.getMercanciaViajeList(valor).subscribe((data) => {
      this.entregas = data
    })
  }

  getPunto(item: any) {
    this.mercancia = item;
    this.setOpen(true);
    this.modalTitle = 'Mercancia';
    this.Activate_Entregas_Comp = true;
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
        this.refreshEntregas();
      } else if (data.status === 404) {
        this.interaction.closeLoading();
        this.interaction.presentToast('top', 'Error en la solicitud');
      }
    });
  }
}
