import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-mostrar-perfil',
  templateUrl: './mostrar-perfil.component.html',
  styleUrls: ['./mostrar-perfil.component.scss'],
})
export class MostrarPerfilComponent implements OnInit {
  perfilList: any = [];

  constructor(
    private cookieService: CookieService,
    private service: SharedService,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.perfil();
  }

  onClick() {
    this.menuCtrl.toggle();
  }

  perfil() {
    const jwt = this.cookieService.get('jwt');
    this.service.user(jwt).subscribe((data: any) => {
      this.perfilList = [data];
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  logout() {
    this.ionViewDidEnter()
    localStorage.clear();
    this.cookieService.delete('jwt');
    this.service.logout().subscribe((data) => {});
    this.router.navigate(['/login']);
  }
}
  