import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SucursalComponent } from './sucursal/sucursal.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: 'sucursal',
    component: SucursalComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot  (routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
