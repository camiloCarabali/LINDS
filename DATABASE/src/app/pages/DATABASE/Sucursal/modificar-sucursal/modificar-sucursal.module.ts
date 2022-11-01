import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarSucursalPageRoutingModule } from './modificar-sucursal-routing.module';

import { ModificarSucursalPage } from './modificar-sucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarSucursalPageRoutingModule
  ],
  declarations: [ModificarSucursalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModificarSucursalPageModule {}
