import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AministradorPageRoutingModule } from './aministrador-routing.module';

import { AministradorPage } from './aministrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AministradorPageRoutingModule
  ],
  declarations: [AministradorPage]
})
export class AministradorPageModule {}
