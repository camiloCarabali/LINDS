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
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'database',
    loadChildren: () =>
      import('./pages/DATABASE/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/DATABASE/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'empresa',
    ...canActivate(onlyAdmin),
    loadChildren: () =>
      import('./pages/DATABASE/Empresa/empresa/empresa.module').then(
        (m) => m.EmpresaPageModule
      ),
  },
  {
    path: 'crear-empresa',
    loadChildren: () =>
      import(
        './pages/DATABASE/Empresa/crear-empresa/crear-empresa.module'
      ).then((m) => m.CrearEmpresaPageModule),
  },
  {
    path: 'modificar-empresa',
    loadChildren: () =>
      import(
        './pages/DATABASE/Empresa/modificar-empresa/modificar-empresa.module'
      ).then((m) => m.ModificarEmpresaPageModule),
  },
  {
    path: 'sucursal',
    ...canActivate(onlyAdmin),
    loadChildren: () =>
      import('./pages/DATABASE/Sucursal/sucursal/sucursal.module').then(
        (m) => m.SucursalPageModule
      ),
  },
  {
    path: 'modificar-sucursal',
    loadChildren: () =>
      import(
        './pages/DATABASE/Sucursal/modificar-sucursal/modificar-sucursal.module'
      ).then((m) => m.ModificarSucursalPageModule),
  },
  {
    path: 'crear-sucursal',
    loadChildren: () =>
      import(
        './pages/DATABASE/Sucursal/crear-sucursal/crear-sucursal.module'
      ).then((m) => m.CrearSucursalPageModule),
  },
  {
    path: 'crear-usuario',
    loadChildren: () =>
      import(
        './pages/DATABASE/Usuario/crear-usuario/crear-usuario.module'
      ).then((m) => m.CrearUsuarioPageModule),
  },
  {
    path: 'modificar-usuario',
    loadChildren: () =>
      import(
        './pages/DATABASE/Usuario/modificar-usuario/modificar-usuario.module'
      ).then((m) => m.ModificarUsuarioPageModule),
  },
  {
    path: 'usuario',
    ...canActivate(onlyAdmin),
    loadChildren: () =>
      import('./pages/DATABASE/Usuario/usuario/usuario.module').then(
        (m) => m.UsuarioPageModule
      ),
  },
  {
    path: 'registro-geo',
    loadChildren: () =>
      import('./pages/Geolocation/registro-geo/registro-geo.module').then(
        (m) => m.RegistroGeoPageModule
      ),
  },
  {
    path: 'conductor',
    loadChildren: () =>
      import('./pages/Geolocation/conductor/conductor.module').then(
        (m) => m.ConductorPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/Geolocation/login-geo/login-geo.module').then(
        (m) => m.LoginGeoPageModule
      ),
  },
  {
    path: 'indicaciones',
    loadChildren: () =>
      import('./pages/Geolocation/indicaciones/indicaciones.module').then(
        (m) => m.IndicacionesPageModule
      ),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./pages/Geolocation/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/Geolocation/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'administrador',
    loadChildren: () =>
      import('./pages/Geolocation/administrador/administrador.module').then(
        (m) => m.AdministradorPageModule
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/Geolocation/perfil/perfil.module').then(
        (m) => m.PerfilPageModule
      ),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./pages/Geolocation/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: 'historial',
    loadChildren: () =>
      import('./pages/Geolocation/historial/historial.module').then(
        (m) => m.HistorialPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
