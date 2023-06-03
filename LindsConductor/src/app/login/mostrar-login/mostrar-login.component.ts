import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { UiService } from 'src/services/ui.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-login',
  templateUrl: './mostrar-login.component.html',
  styleUrls: ['./mostrar-login.component.scss'],
})
export class MostrarLoginComponent implements OnInit {
  credenciales: any;
  correo: string = '';
  password: string = '';

  constructor(
    private service: SharedService,
    private cookieService: CookieService,
    private interaction: UiService,
    private router: Router,
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.ionViewDidEnter();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  async login() {
    await this.interaction.showLoading('Validando...');
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
            this.interaction.closeLoading();
            this.interaction.presentAlert(
              'Para poder usar las funciones de administrador debes ingresar con nuestra aplicación web.'
            );
          } else if (res.rol == 'Conductor') {
            this.interaction.closeLoading();
            this.interaction.presentToast('top', 'Ingresado con Exito');
            this.router.navigate(['/perfil']);
            this.correo = ''
            this.password = ''
          } else if (res.rol == 'Logistico') {
            this.interaction.closeLoading();
            this.interaction.presentAlert(
              'Para poder usar las funciones de logistica debes ingresar con nuestra aplicación web.'
            );
          }

          localStorage.setItem('rutaInicio', res.sucursal);
        });
      },
      () => {
        this.interaction.closeLoading();
        this.interaction.presentToast('top', 'Correo o Contraseña invalido');
      }
    );
  }
}
