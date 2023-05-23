import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { HistorialComponent } from './historial/historial.component';
import { ViajeComponent } from './viaje/viaje.component';
import { LoginComponent } from './login/login.component';
import { IndicacionesComponent } from './indicaciones/indicaciones.component';
import { EntregasComponent } from './entregas/entregas.component';
import { MercanciaComponent } from './mercancia/mercancia.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'mapa',
    component: MapaComponent,
  },
  {
    path: 'historial',
    component: HistorialComponent,
  },
  {
    path: 'viaje',
    component: ViajeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'indicaciones',
    component: IndicacionesComponent,
  },
  {
    path: 'entregas',
    component: EntregasComponent,
  },
  {
    path: 'mercancia',
    component: MercanciaComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
