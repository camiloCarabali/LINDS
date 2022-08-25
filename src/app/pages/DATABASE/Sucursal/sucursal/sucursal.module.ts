import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SucursalPageRoutingModule } from './sucursal-routing.module';

import { SucursalPage } from './sucursal.page';
import { ModificarSucursalPage } from '../modificar-sucursal/modificar-sucursal.page';
import { ModificarSucursalPageModule } from '../modificar-sucursal/modificar-sucursal.module';

@NgModule({
  entryComponents: [
    ModificarSucursalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SucursalPageRoutingModule,
    ModificarSucursalPageModule
  ],
  declarations: [SucursalPage]
})
export class SucursalPageModule {}
