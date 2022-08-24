import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'empresa',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'empresa',
    loadChildren: () =>
      import('./pages/Empresa/empresa/empresa.module').then(
        (m) => m.EmpresaPageModule
      ),
  },
  {
    path: 'crear-empresa',
    loadChildren: () =>
      import('./pages/Empresa/crear-empresa/crear-empresa.module').then(
        (m) => m.CrearEmpresaPageModule
      ),
  },
  {
    path: 'modificar-empresa',
    loadChildren: () =>
      import('./pages/Empresa/modificar-empresa/modificar-empresa.module').then(
        (m) => m.ModificarEmpresaPageModule
      ),
  },
  {
    path: 'sucursal',
    loadChildren: () =>
      import('./pages/Sucursal/sucursal/sucursal.module').then(
        (m) => m.SucursalPageModule
      ),
  },
  {
    path: 'modificar-sucursal',
    loadChildren: () =>
      import(
        './pages/Sucursal/modificar-sucursal/modificar-sucursal.module'
      ).then((m) => m.ModificarSucursalPageModule),
  },
  {
    path: 'crear-sucursal',
    loadChildren: () =>
      import('./pages/Sucursal/crear-sucursal/crear-sucursal.module').then(
        (m) => m.CrearSucursalPageModule
      ),
  },
  {
    path: 'crear-usuario',
    loadChildren: () =>
      import('./pages/Usuario/crear-usuario/crear-usuario.module').then(
        (m) => m.CrearUsuarioPageModule
      ),
  },
  {
    path: 'modificar-usuario',
    loadChildren: () =>
      import('./pages/Usuario/modificar-usuario/modificar-usuario.module').then(
        (m) => m.ModificarUsuarioPageModule
      ),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./pages/Usuario/usuario/usuario.module').then(
        (m) => m.UsuarioPageModule
      ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
