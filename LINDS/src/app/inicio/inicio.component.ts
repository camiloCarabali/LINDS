import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})

export class InicioComponent implements OnInit {
  constructor(
    private service: SharedService,
    private cookieService: CookieService,
    private router: Router
  ) {}




  credenciales: any;
  correo: string = '';
  password: string = '';

  ngOnInit() {}

  login() {

    //this.router.navigate(['/empresa']);
    this.router.navigate(['/viaje']);
    /**const credenciales = {
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
    );*/
  }
}
