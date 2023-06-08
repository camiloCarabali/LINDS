import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Router } from '@angular/router';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  constructor(
    private service: SharedService,
    private interaction: UiServiceService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  credenciales: any;
  correo: string = '';
  password: string = '';

  ngOnInit() {
  }

  direccion() {
    let valor = localStorage.getItem('sucursal')!;
    this.service
      .direccionSucursal(valor.replace(/ /g, '_'))
      .subscribe((data: any) => {
        localStorage.setItem('puntoInicio', data);
      });
  }

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
            this.router.navigate(['/empresa']);
            this.correo = '';
            this.password = '';
          } else if (res.rol == 'Conductor') {
            this.interaction.presentAlert(
              'Para poder usar las funciones de condcutor debes ingresar con nuestra aplicación movil.'
            );
          } else if (res.rol == 'Logistico') {
            this.router.navigate(['/mercancia']);
            this.correo = '';
            this.password = '';
          }
          localStorage.setItem('nombre', res.nombre);
          localStorage.setItem('empresa', res.empresa);
          localStorage.setItem('sucursal', res.sucursal);
          localStorage.setItem('rol', res.rol);
          this.direccion();
        });
      },
      () => {
        this.interaction.presentToast('top', 'Usuario o contraseña invalida');
      }
    );
  }
}
