import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroGeoPage } from './registro-geo.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroGeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroGeoPageRoutingModule {}
