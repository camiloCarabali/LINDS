import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearSucursalPage } from './crear-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: CrearSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearSucursalPageRoutingModule {}
