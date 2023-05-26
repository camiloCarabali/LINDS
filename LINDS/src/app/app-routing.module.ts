import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SucursalComponent } from './ADMINISTRADOR/sucursal/sucursal.component';
import { UsuarioComponent } from './ADMINISTRADOR/usuario/usuario.component';
import { EmpresaComponent } from './ADMINISTRADOR/empresa/empresa.component';
import { InicioComponent } from './inicio/inicio.component';
import { CamionComponent } from './LOGISTICO/camion/camion.component';
import { PuntoEntregaComponent } from './LOGISTICO/punto-entrega/punto-entrega.component';
import { ViajeComponent } from './LOGISTICO/viaje/viaje.component';
import { MercanciaComponent } from './LOGISTICO/mercancia/mercancia.component';
import { ListaConductoresComponent } from './lista-conductores/lista-conductores.component';

import { IngresadoLogisticaGuard } from '../guards/ingresado-logistica.guard';
import { IngresadoAdministradorGuard } from '../guards/ingresado-administrador.guard';
import { NoIngresadoLogisticaGuard } from '../guards/no-ingresado-logistica.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [NoIngresadoLogisticaGuard]
  },
  {
    path: 'empresa',
    component: EmpresaComponent,
    canActivate: [IngresadoAdministradorGuard]
  },
  {
    path: 'sucursal',
    component: SucursalComponent,
    canActivate: [IngresadoAdministradorGuard]
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [IngresadoAdministradorGuard]
  },
  {
    path: 'camion',
    component: CamionComponent,
    canActivate: [IngresadoLogisticaGuard]
  },
  {
    path: 'punto-entrega',
    component: PuntoEntregaComponent,
    canActivate: [IngresadoLogisticaGuard]
  },
  {
    path: 'viaje',
    component: ViajeComponent,
    canActivate: [IngresadoLogisticaGuard]
  },
  {
    path: 'mercancia',
    component: MercanciaComponent,
    canActivate: [IngresadoLogisticaGuard]
  },
  {
    path: 'conductores',
    component: ListaConductoresComponent,
    canActivate: [IngresadoLogisticaGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
