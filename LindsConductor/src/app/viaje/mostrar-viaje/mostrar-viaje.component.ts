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

  generateTrip() {
    localStorage.clear();
    const waypoints: any = [];
    const jwt = this.cookieService.get('jwt');
    this.service.user(jwt).subscribe((res: any) => {
      this.service.getAsignacion(res.cedula).subscribe((data: any) => {
        this.viaje = data;
        for (let i of this.viaje) {
          this.inicio = i.inicio;
          this.id = i.id;
          this.service.waypoints(this.id).subscribe((request) => {
            for (let j = 0; j < request.length; j++) {
              waypoints.push({
                location: request[j],
                stopover: true,
              });
            }
            this.llegada = request[request.length - 1];
            waypoints.pop();
            localStorage.setItem('rutaInicio', this.inicio);
            localStorage.setItem('rutaLlegada', this.llegada);
            localStorage.setItem('waypoints', JSON.stringify(waypoints));
          });
        }
      });
    });
    this.router.navigate(['/mapa']);
  }
}
