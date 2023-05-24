import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/services/shared.service';

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
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.refreshEntregas();
  }

  async refreshEntregas() {
    const jwt = this.cookieService.get('jwt');
    this.service.user(jwt).subscribe((res: any) => {
      this.service.getAsignacion(res.cedula).subscribe((data: any) => {
        for (let i of data) {
          this.service.getEntregas(i.id).subscribe((request: any) => {
            this.entregas = request;
          });
        }
      });
    });
  }

  getPunto(item: any) {
    this.mercancia = item;
    this.setOpen(true);
    this.modalTitle = 'Mercancia';
    this.Activate_Entregas_Comp = true;
  }
}
