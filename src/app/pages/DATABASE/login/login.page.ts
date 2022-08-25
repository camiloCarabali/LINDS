import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    await this.interacion.showLoading("ingresando...");
    const res = await this.auth
      .login(this.credenciales.correo, this.credenciales.password)
      .catch((error) => {
        this.interacion.closeLoading()
        this.interacion.presentToast('Usuario o Contraseña invalido');
      });
      if(res){
        this.interacion.closeLoading()
        this.interacion.presentToast('Ingresado con exito');
        this.credenciales.correo = "";
        this.credenciales.password = "";
        this.router.navigate(['/empresa']);
      }
  }
}
