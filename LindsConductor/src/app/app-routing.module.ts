import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { HistorialComponent } from './historial/historial.component';
import { ViajeComponent } from './viaje/viaje.component';
import { LoginComponent } from './login/login.component';
import { IndicacionesComponent } from './indicaciones/indicaciones.component';
import { EntregasComponent } from './entregas/entregas.component';
import { MercanciaComponent } from './mercancia/mercancia.component';
import { PerfilComponent } from './perfil/perfil.component';
import { IngresadoGuard } from '../guards/ingresado.guard';
import { NoIngresadoGuard } from '../guards/no-ingresado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'mapa',
    component: MapaComponent,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'viaje',
    component: ViajeComponent,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'indicaciones',
    component: IndicacionesComponent,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'entregas',
    component: EntregasComponent,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'mercancia',
    component: MercanciaComponent,
    canActivate: [IngresadoGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent, 
    canActivate: [IngresadoGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
