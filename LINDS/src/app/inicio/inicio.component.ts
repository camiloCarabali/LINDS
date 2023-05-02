import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {

  rol = ''

  constructor(
    private share: SharedService,
    private router: Router,
    private interaction: UiServiceService
  ) { }

  ngOnInit() {}

  async login(){

    //await this.interaction.showLoading('Verificando datos...');
    //await this.interaction.showLoading('Ingresando...');

    if(this.rol == 'Administrador'){
      console.log("Administrador");
      //this.interaction.closeLoading();
      //this.interaction.presentToast('Ingresado con exito');
      //this.router.navigate(['/empresa']);
    }
    else if(this.rol == 'Logistica'){
      console.log("Logistica")
    }
    else if(this.rol == 'Conductor'){
      console.log("Conductor")
    } else{
      this.interaction.alertaInformativa("No cuenta con los permisos suficientes para ingresar.");
    }

    this.router.navigate(['/empresa']);


  }


}


