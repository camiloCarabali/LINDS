import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'environments/environment';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PerfilPageRoutingModule],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
  declarations: [PerfilPage],
})
export class PerfilPageModule {}
