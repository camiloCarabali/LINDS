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
  public claseConductor: string;

  public appPagesConductor = [
    { title: 'Viaje', url: '/conductor', icon: 'car' },
    { title: 'Historial de viajes', url: '/historial', icon: 'time' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
  ];
appPages: any;
labels: any;

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
        this.irCoductor(res.uid);
        console.log('Esta logeado');
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
        this.claseConductor = '';
      }
    });
  }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('Sesion finalizada');
    this.router.navigate(['/login']);
  }
}


