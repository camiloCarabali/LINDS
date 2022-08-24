import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarSucursalPage } from './modificar-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarSucursalPageRoutingModule {}
