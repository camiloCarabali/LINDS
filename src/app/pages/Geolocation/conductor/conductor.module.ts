import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorPageRoutingModule } from './conductor-routing.module';

import { ConductorPage } from './conductor.page';
import { IndicacionesPage } from '../indicaciones/indicaciones.page';
import { IndicacionesPageModule } from '../indicaciones/indicaciones.module';

@NgModule({
  entryComponents: [
    IndicacionesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorPageRoutingModule,
    IndicacionesPageModule
  ],
  declarations: [ConductorPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConductorPageModule {}
