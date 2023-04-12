import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo1 = 'carabalijuancamilo@gmail.com'
  correo2 = 'ospinamj707@gmail.com'

  credenciales = {
    correo: null,
    password: null,
  };

  constructor(
    private auth: AuthService,
    private interacion: UiServiceService,
    private router: Router
  ) {}

  ngOnInit() {}

  async login() {
    if(this.credenciales.correo==this.correo1 || this.credenciales.correo==this.correo2){
      await this.interacion.showLoading('ingresando...');
      this.auth
        .login(this.credenciales.correo, this.credenciales.password)
        .then((res) => {
          this.interacion.closeLoading();
          this.interacion.presentToast('Ingresado con exito');
          this.router.navigate(['/empresa']);
          this.credenciales.correo = '';
          this.credenciales.password = '';
        })
        .catch((error) => {
          this.interacion.closeLoading();
          this.interacion.presentToast('Usuario o Contraseña invalido');
        });
    }else{
      this.interacion.alertaInformativa("No cuenta con los permisos suficientes para ingresar.");
    }
  }
}
