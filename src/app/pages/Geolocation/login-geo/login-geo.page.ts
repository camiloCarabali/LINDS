import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-login-geo',
  templateUrl: './login-geo.page.html',
  styleUrls: ['./login-geo.page.scss'],
})
export class LoginGeoPage implements OnInit {

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
    await this.interacion.showLoading('ingresando...');
    this.auth
      .login(this.credenciales.correo, this.credenciales.password)
      .then((res) => {
        this.interacion.closeLoading();
        this.interacion.presentToast('Ingresado con exito');
       const isVerified = this.auth.isEmailVerified(this.credenciales.correo);
        this.redirectUser(isVerified);
        this.credenciales.correo = '';
        this.credenciales.password = '';
      })
      .catch((error) => {
        this.interacion.closeLoading();
        this.interacion.presentToast('Usuario o Contraseña invalido');
      });
  }

  redirectUser(isVerified: boolean){
    if(isVerified){
      this.router.navigate(['conductor']);
    }else {
      this.router.navigate(['verify-email']);
    }
  }

}
