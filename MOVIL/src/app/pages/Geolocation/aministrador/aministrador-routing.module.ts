import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AministradorPage } from './aministrador.page';

const routes: Routes = [
  {
    path: '',
    component: AministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AministradorPageRoutingModule {}
