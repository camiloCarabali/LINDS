import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-viaje',
  templateUrl: './mostrar-viaje.component.html',
  styleUrls: ['./mostrar-viaje.component.scss'],
})
export class MostrarViajeComponent implements OnInit {
  viaje: any = [];

  constructor(
    private service: SharedService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.refreshViaje();
  }

  refreshViaje() {
    const jwt = this.cookieService.get('jwt');
    this.service.user(jwt).subscribe((res: any) => {
      this.service.getHistorial(res.cedula).subscribe((data: any) => {
        this.viaje = data;
      });
    });
  }
}
