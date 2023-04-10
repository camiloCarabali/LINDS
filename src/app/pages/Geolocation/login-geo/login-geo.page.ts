import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { UiServiceService } from 'app/services/ui-service.service';
import * as Cordova from 'cordova';
import { FirestoreService } from 'app/services/firestore.service';

@Component({
  selector: 'app-login-geo',
  templateUrl: './login-geo.page.html',
  styleUrls: ['./login-geo.page.scss'],
})
export class LoginGeoPage implements OnInit {

  estado = false;


  credenciales = {
    correo: null,
    password: null,
  };

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private interacion: UiServiceService,
    private router: Router
  ) {}

  ngOnInit() {}

  async login() {
    await this.interacion.showLoading('ingresando...');
    this.auth
      .login(this.credenciales.correo, this.credenciales.password)
      .then(async (res) => {
        if (res) {
          if (window.cordova) {
            (await this.firestore.searchCargo('conductor', res.user.uid)).subscribe((res) => {
              if(res.length != 0) {
                this.estado = false;
                this.interacion.closeLoading();
                this.interacion.presentToast('Ingresado con exito');
                this.auth.stateUser().subscribe((user) => {
                  this.redirectUser(user.emailVerified);
                });
              }else{
                this.estado = true;
                this.interacion.closeLoading();
                this.interacion.presentToast(
                  'Para poder usar las funciones de administrador tiene que ingresar con nuestra aplicacion web.'
                );
                this.auth.stateUser().subscribe((user) => {
                  this.redirectUser(user.emailVerified);
                });
              }
            });
          } else {
            (await this.firestore.searchCargo('administrador', res.user.uid)).subscribe((res) => {
              if (res.length != 0) {
                this.estado = false;
                this.interacion.closeLoading();
                this.interacion.presentToast('Ingresado con exito');
                this.auth.stateUser().subscribe((user) => {
                  this.redirectUser(user.emailVerified);
                });
              }else{
                this.estado = true;
                this.interacion.closeLoading();
                this.interacion.presentToast(
                  'Para poder usar las funciones de conductor tiene que ingresar con nuestra aplicacion movil.'
                );
                this.auth.stateUser().subscribe((user) => {
                  this.redirectUser(user.emailVerified);
                });
              }
            });
          }
        } else {
          this.interacion.closeLoading();
          this.interacion.presentToast('Usuario o Contraseña invalido');
        }
        this.credenciales.correo = '';
        this.credenciales.password = '';
      })
      .catch((error) => {
        this.interacion.closeLoading();
        this.interacion.presentToast('Usuario o Contraseña invalido');
      });
  }

  redirectUser(isVerified: boolean) {
    if (isVerified && this.estado){
      this.router.navigate(['/login']);
      this.auth.logout();
    }else if (isVerified) {
      this.router.navigate(['/perfil']);
    } else {
      this.router.navigate(['/verify-email']);
    }
  }
}
