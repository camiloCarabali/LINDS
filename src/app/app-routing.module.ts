import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { canActivate } from "@angular/fire/compat/auth-guard"

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
    redirectTo: 'database',
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
