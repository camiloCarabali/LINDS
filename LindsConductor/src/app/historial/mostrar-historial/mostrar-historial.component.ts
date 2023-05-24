import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-historial',
  templateUrl: './mostrar-historial.component.html',
  styleUrls: ['./mostrar-historial.component.scss'],
})
export class MostrarHistorialComponent implements OnInit {
  constructor(
    private service: SharedService,
    private cookieService: CookieService,
    private menuCtrl: MenuController
  ) {}

  historial: any = [];

  ngOnInit() {
    this.refreshHistorial();
    this.ionViewWillLeave();
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  onClick(){
    this.menuCtrl.toggle()
  }

  refreshHistorial() {
    const jwt = this.cookieService.get('jwt');
    this.service.user(jwt).subscribe((res: any) => {
      this.service.getHistorial(res.cedula).subscribe((data: any) => {
        this.historial = data;
      });
    });
  }
}
