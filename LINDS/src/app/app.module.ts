import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SucursalComponent } from './ADMINISTRADOR/sucursal/sucursal.component';
import { MostrarSucursalComponent } from './ADMINISTRADOR/sucursal/mostrar-sucursal/mostrar-sucursal.component';
import { CrearEditarSucursalComponent } from './ADMINISTRADOR/sucursal/crear-editar-sucursal/crear-editar-sucursal.component';
import { UsuarioComponent } from './ADMINISTRADOR/usuario/usuario.component';
import { MostrarUsuarioComponent } from './ADMINISTRADOR/usuario/mostrar-usuario/mostrar-usuario.component';
import { CrearEditarUsuarioComponent } from './ADMINISTRADOR/usuario/crear-editar-usuario/crear-editar-usuario.component';

import { CamionComponent } from './LOGISTICO/camion/camion.component';

import { SharedService } from 'src/services/shared.service';
import { InicioComponent } from './inicio/inicio.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmpresaComponent } from './ADMINISTRADOR/empresa/empresa.component';
import { MostrarEmpresaComponent } from './ADMINISTRADOR/empresa/mostrar-empresa/mostrar-empresa.component';
import { CrearEditarEmpresaComponent } from './ADMINISTRADOR/empresa/crear-editar-empresa/crear-editar-empresa.component';

import { MostrarCamionComponent } from './LOGISTICO/camion/mostrar-camion/mostrar-camion.component';
import { CrearEditarCamionComponent } from './LOGISTICO/camion/crear-editar-camion/crear-editar-camion.component';

import { PuntoEntregaComponent } from './LOGISTICO/punto-entrega/punto-entrega.component';
import { MostrarPuntoEntregaComponent } from './LOGISTICO/punto-entrega/mostrar-punto-entrega/mostrar-punto-entrega.component';
import { CrearEditarPuntoEntregaComponent } from './LOGISTICO/punto-entrega/crear-editar-punto-entrega/crear-editar-punto-entrega.component';

import { ViajeComponent } from './LOGISTICO/viaje/viaje.component';
import { MostrarViajeComponent } from './LOGISTICO/viaje/mostrar-viaje/mostrar-viaje.component';
import { CrearEditarViajeComponent } from './LOGISTICO/viaje/crear-editar-viaje/crear-editar-viaje.component';
import { MapaViajeComponent } from './LOGISTICO/viaje/mapa-viaje/mapa-viaje.component';

import { MercanciaComponent } from './LOGISTICO/mercancia/mercancia.component';
import { MostrarMercanciaComponent } from './LOGISTICO/mercancia/mostrar-mercancia/mostrar-mercancia.component';
import { CrearEditarMercanciaComponent } from './LOGISTICO/mercancia/crear-editar-mercancia/crear-editar-mercancia.component';
import { MapaMercanciaComponent } from './LOGISTICO/mercancia/mapa-mercancia/mapa-mercancia.component';

import { PiefooterComponent } from './estiloHF/piefooter/piefooter.component';
import { HeaderNormalComponent } from './estiloHF/header-normal/header-normal.component';
import { CabezaheaderComponent } from './estiloHF/cabezaheader/cabezaheader.component';

import { ListaConductoresComponent } from './LOGISTICO/lista-conductores/lista-conductores.component';
import { MostrarListaConductoresComponent } from './LOGISTICO/lista-conductores/mostrar-lista-conductores/mostrar-lista-conductores.component';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    SucursalComponent,
    MostrarSucursalComponent,
    CrearEditarSucursalComponent,
    UsuarioComponent,
    MostrarUsuarioComponent,
    CrearEditarUsuarioComponent,
    EmpresaComponent,
    MostrarEmpresaComponent,
    CrearEditarEmpresaComponent,
    InicioComponent,
    CamionComponent,
    MostrarCamionComponent,
    CrearEditarCamionComponent,
    PuntoEntregaComponent,
    MostrarPuntoEntregaComponent,
    CrearEditarPuntoEntregaComponent,
    ViajeComponent,
    MostrarViajeComponent,
    CrearEditarViajeComponent,
    MapaViajeComponent,
    MercanciaComponent,
    MostrarMercanciaComponent,
    CrearEditarMercanciaComponent,
    MapaMercanciaComponent,
    HeaderNormalComponent,
    CabezaheaderComponent,
    PiefooterComponent,
    ListaConductoresComponent,
    MostrarListaConductoresComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es' },
    SharedService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
