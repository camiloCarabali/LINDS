import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UiServiceService } from './services/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public estado: string;

  public appPages = [
    { title: 'Empresas', url: '/empresa', icon: 'business' },
    { title: 'Sucursales', url: '/sucursal', icon: 'briefcase' },
    { title: 'Usuarios', url: '/usuario', icon: 'people' }
  ];
  constructor(private auth: AuthService,
    private interaction: UiServiceService,
    private router: Router) {
      this.estado = "true";
      this.auth.stateUser().subscribe(res =>{
        if(res){
          console.log('Esta logeado');
          this.estado = "false";
        } else {
          console.log("No esta logeado");
          this.estado = "true";
        }
      })
    }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('Sesion finalizada');
    this.router.navigate(['/database']);
  }
}
