import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaPageRoutingModule } from './empresa-routing.module';

import { EmpresaPage } from './empresa.page';
import { ModificarEmpresaPage } from '../modificar-empresa/modificar-empresa.page';
import { ModificarEmpresaPageModule } from '../modificar-empresa/modificar-empresa.module';

@NgModule({
  entryComponents: [
    ModificarEmpresaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaPageRoutingModule,
    ModificarEmpresaPageModule
  ],
  declarations: [EmpresaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmpresaPageModule {}
