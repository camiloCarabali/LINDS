import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGeoPage } from './login-geo.page';

const routes: Routes = [
  {
    path: '',
    component: LoginGeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginGeoPageRoutingModule {}
