import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarUsuarioPageRoutingModule } from './modificar-usuario-routing.module';

import { ModificarUsuarioPage } from './modificar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarUsuarioPageRoutingModule
  ],
  declarations: [ModificarUsuarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModificarUsuarioPageModule {}
