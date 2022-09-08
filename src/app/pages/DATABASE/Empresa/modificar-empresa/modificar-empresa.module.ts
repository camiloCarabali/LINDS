import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarEmpresaPageRoutingModule } from './modificar-empresa-routing.module';

import { ModificarEmpresaPage } from './modificar-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarEmpresaPageRoutingModule
  ],
  declarations: [ModificarEmpresaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModificarEmpresaPageModule {}
