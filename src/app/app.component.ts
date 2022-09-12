import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  public appPages = [
    { title: 'Empresas', url: '/empresa', icon: 'business' },
    { title: 'Sucursales', url: '/sucursal', icon: 'briefcase' },
    { title: 'Usuarios', url: '/usuario', icon: 'people' },
  ];

  public appPagesConductor = [
    { title: 'Viaje', url: '/conductor', icon: 'car' },
    { title: 'Historial de viajes', url: '/historial', icon: 'time' },
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
        this.irCoductor(res.uid);
        this.irAdmin(res.uid);
        console.log('Esta logeado');
        this.estado = 'false';
      } else {
        console.log('No esta logeado');
        this.estado = 'true';
      }
    });
  }

  async irCoductor(uid) {
    this.cargo = 'conductor';
    (await this.firestore.searchCargo(this.cargo, uid)).subscribe((res) => {
      if (res.length != 0) {
        this.claseAdmin = 'ion-hide';
        this.claseConductor = '';
      }
    });
  }

  async irAdmin(uid) {
    this.cargo = 'administrador';
    (await this.firestore.searchCargo(this.cargo, uid)).subscribe((res) => {
      if (res.length != 0) {
        this.claseAdmin = '';
        this.claseConductor = 'ion-hide';
      }
    });
  }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('Sesion finalizada');
    this.router.navigate(['/login']);
  }
}
