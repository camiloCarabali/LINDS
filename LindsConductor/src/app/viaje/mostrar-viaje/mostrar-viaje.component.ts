import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-viaje',
  templateUrl: './mostrar-viaje.component.html',
  styleUrls: ['./mostrar-viaje.component.scss'],
})
export class MostrarViajeComponent implements OnInit {
  viaje: any = [];
  id: string = '';
  inicio: string = '';
  llegada: string = '';

  constructor(
    private service: SharedService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshViaje();
  }

  refreshViaje() {
    const jwt = this.cookieService.get('jwt');
    this.service.user(jwt).subscribe((res: any) => {
      this.service.getAsignacion(res.cedula).subscribe((data: any) => {
        this.viaje = data;
      });
    });
  }

  generateTrip(item: any) {
    localStorage.clear();
    localStorage.setItem('id', item.id);
    localStorage.setItem('rutaInicio', item.inicio);
    const waypoints: any = [];
    this.service
      .waypoints(localStorage.getItem('id') as string)
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          waypoints.push({
            location: data[i],
            stopover: true,
          });
        }
        this.llegada = data[data.length - 1];
        waypoints.pop();
        localStorage.setItem('rutaLlegada', this.llegada);
        localStorage.setItem('waypoints', JSON.stringify(waypoints));
      });
    this.router.navigate(['/mapa']);
  }
}
