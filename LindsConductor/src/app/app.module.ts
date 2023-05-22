import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from 'src/services/shared.service';
import { FormsModule } from '@angular/forms';

import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MapaComponent } from './mapa/mapa.component';
import { MostrarMapaComponent } from './mapa/mostrar-mapa/mostrar-mapa.component';

import { HistorialComponent } from './historial/historial.component';
import { MostrarHistorialComponent } from './historial/mostrar-historial/mostrar-historial.component';

import { ViajeComponent } from './viaje/viaje.component';
import { MostrarViajeComponent } from './viaje/mostrar-viaje/mostrar-viaje.component';

import { LoginComponent } from './login/login.component';
import { MostrarLoginComponent } from './login/mostrar-login/mostrar-login.component';


@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    MostrarMapaComponent,
    HistorialComponent,
    MostrarHistorialComponent,
    ViajeComponent,
    MostrarViajeComponent,
    LoginComponent,
    MostrarLoginComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    SharedService,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
