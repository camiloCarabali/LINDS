import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearSucursalPageRoutingModule } from './crear-sucursal-routing.module';

import { CrearSucursalPage } from './crear-sucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearSucursalPageRoutingModule
  ],
  declarations: [CrearSucursalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CrearSucursalPageModule {}
