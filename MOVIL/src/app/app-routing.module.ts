import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { canActivate } from '@angular/fire/compat/auth-guard';

const uidAdmin1 = '27CkhymwIyXBdCn50uD3I7ncuAx1';
const uidAdmin2 = 'fPtxVafLD8ZrvoIsS52SRItHHf32';

const onlyAdmin = () =>
  map(
    (user: any) =>
      (!!user && user.uid === uidAdmin1) || (!!user && user.uid === uidAdmin2)
  );

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-geo',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
    import('./pages/home/home.module').then( (m) => m.HomePageModule)
  },
  {
    path: 'aministrador',
    loadChildren: () =>
      import('./pages/Geolocation/aministrador/aministrador.module').then(
        (m) => m.AministradorPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./pages/Geolocation/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/Geolocation/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule)
  },
  {
    path: 'historial',
    loadChildren: () =>
      import('./pages/Geolocation/historial/historial.module').then(
        (m) => m.HistorialPageModule)
  },
  {
    path: 'indicaciones',
    loadChildren: () =>
      import('./pages/Geolocation/indicaciones/indicaciones.module').then(
        (m) => m.IndicacionesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/Geolocation/perfil/perfil.module').then(
        (m) => m.PerfilPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./pages/Geolocation/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule)
  },
  {
    path: 'conductor',
    loadChildren: () =>
      import('./pages/Geolocation/Viaje/conductor/conductor.module').then(
        (m) => m.ConductorPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () =>
      import('./pages/Geolocation/Viaje/viaje/viaje.module').then(
        (m) => m.ViajePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
