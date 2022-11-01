import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndicacionesPageRoutingModule } from './indicaciones-routing.module';

import { IndicacionesPage } from './indicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndicacionesPageRoutingModule
  ],
  declarations: [IndicacionesPage]
})
export class IndicacionesPageModule {}
