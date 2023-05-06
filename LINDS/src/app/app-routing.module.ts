import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SucursalComponent } from './ADMINISTRADOR/sucursal/sucursal.component';
import { UsuarioComponent } from './ADMINISTRADOR/usuario/usuario.component';
import { EmpresaComponent } from './ADMINISTRADOR/empresa/empresa.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'

  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'empresa',
    component: EmpresaComponent
  },
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
