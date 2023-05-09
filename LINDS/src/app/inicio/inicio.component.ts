import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  constructor(
    private service: SharedService,
    private cookieService: CookieService
  ) {}

  credenciales: any;
  correo: string = '';
  password: string = '';

  ngOnInit() {}

  login() {
    const credenciales = {
      correo: this.correo,
      password: this.password,
    };

    this.service.login(credenciales).subscribe(
      (token) => {
        this.cookieService.set('jwt', token.jwt);
        const jwt = this.cookieService.get('jwt');
        this.service.user(jwt).subscribe((res: any) => {
          if (res.rol == 'Administrador') {
            console.log('Administrador');
          } else if (res.rol == 'Conductor') {
            console.log('Conductor');
          } else if (res.rol == 'Logistico') {
            console.log('Logistico');
          }
        });
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
