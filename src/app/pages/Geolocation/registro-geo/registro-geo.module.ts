import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroGeoPageRoutingModule } from './registro-geo-routing.module';

import { RegistroGeoPage } from './registro-geo.page';
import { CrearUsuarioPage } from '../../DATABASE/Usuario/crear-usuario/crear-usuario.page';
import { CrearUsuarioPageModule } from '../../DATABASE/Usuario/crear-usuario/crear-usuario.module';

@NgModule({
  entryComponents: [CrearUsuarioPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroGeoPageRoutingModule,
    CrearUsuarioPageModule
  ],
  declarations: [RegistroGeoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistroGeoPageModule {}
