import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { HistorialComponent } from './historial/historial.component';
import { ViajeComponent } from './viaje/viaje.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'historial',
    pathMatch: 'full'
  },
  {
    path: 'mapa',
    component: MapaComponent
  },
  {
    path: 'historial',
    component: HistorialComponent
  },
  {
    path: 'viaje',
    component: ViajeComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
