import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { UiServiceService } from './services/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public estado: string;
  public cargo: string;
  public claseAdmin: string;
  public claseConductor: string;
  public i: number;
  public uidAdmin1 = 'A5Mku9lBMqdaLwnclmn0w4tWh2b2';
  public uidAdmin2 = 'W1MmTn4ICkV6EhbU9oveDSE12d62';

  public appPagesDatabase = [
    { title: 'Empresas', url: '/empresa', icon: 'business' },
    { title: 'Sucursales', url: '/sucursal', icon: 'briefcase' },
    { title: 'Usuarios', url: '/usuario', icon: 'people' },
  ];

  public appPagesConductor = [
    { title: 'Viaje', url: '/conductor', icon: 'car' },
    { title: 'Seleccion de viaje', url: '/historial', icon: 'time' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
  ];

  public appPagesAdministrador = [
    { title: 'Asignar viaje', url: '/crear-viaje', icon: 'add-circle' },
    { title: 'Historial de viajes', url: '/administrador', icon: 'bus' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
  ];

  constructor(
    private auth: AuthService,
    private interaction: UiServiceService,
    private router: Router,
    private firestore: FirestoreService
  ) {
    this.estado = 'true';
    this.auth.stateUser().subscribe((res) => {
      if (res) {
        if (res.emailVerified == false) {
          this.estado = 'true';
        } else {
          this.estado = 'false';
        }
        if (res.uid == this.uidAdmin1 || res.uid == this.uidAdmin2) {
          this.estado = 'false';
          this.claseAdmin = '';
          this.i = 1;
          this.getArray();
        } else {
          this.irCoductor(res.uid);
          this.irAdmin(res.uid);
        }
      } else {
        this.estado = 'true';
      }
    });
  }

  getArray() {
    if (this.i == 1) {
      return this.appPagesDatabase;
    } else if (this.i == 2) {
      return this.appPagesAdministrador;
    } else {
      return this.appPagesConductor;
    }
  }

  async irCoductor(uid) {
    this.cargo = 'conductor';
    (await this.firestore.searchCargo(this.cargo, uid)).subscribe((res) => {
      if (res.length != 0) {
        this.i = 3;
        this.getArray();
        this.claseAdmin = '';
      }
    });
  }

  async irAdmin(uid) {
    this.cargo = 'administrador';
    (await this.firestore.searchCargo(this.cargo, uid)).subscribe((res) => {
      if (res.length != 0) {
        this.i = 2;
        this.getArray();
        this.claseAdmin = '';
      }
    });
  }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('Sesion finalizada');
    this.router.navigate(['/login']);
  }
}
