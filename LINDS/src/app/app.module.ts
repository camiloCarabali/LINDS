import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SucursalComponent } from './sucursal/sucursal.component';
import { MostrarSucursalComponent } from './sucursal/mostrar-sucursal/mostrar-sucursal.component';
import { CrearEditarSucursalComponent } from './sucursal/crear-editar-sucursal/crear-editar-sucursal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MostrarUsuarioComponent } from './usuario/mostrar-usuario/mostrar-usuario.component';
import { CrearEditarUsuarioComponent } from './usuario/crear-editar-usuario/crear-editar-usuario.component';
import { SharedService } from 'src/services/shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    SucursalComponent,
    MostrarSucursalComponent,
    CrearEditarSucursalComponent,
    UsuarioComponent,
    MostrarUsuarioComponent,
    CrearEditarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SharedService,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
