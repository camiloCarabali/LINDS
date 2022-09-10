import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginGeoPageRoutingModule } from './login-geo-routing.module';

import { LoginGeoPage } from './login-geo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginGeoPageRoutingModule
  ],
  declarations: [LoginGeoPage]
})
export class LoginGeoPageModule {}
