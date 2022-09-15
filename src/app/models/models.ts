export interface UserLindsDatabase {
  id: string;
  nombre: string;
  correo: string;
  uid: string;
  password: string;
  perfil: 'administrador';
}

export interface Empresa {
  id: string;
  nombre: string;
  nit: number;
}

export interface Sucursal {
  id: string;
  empresa: string;
  nombre: string;
  ciudad: string;
  direccion: string;
}

export interface Usuario {
  emailVerified: boolean;
  empresa: string;
  sucursal: string;
  uid: string;
  nombre: string;
  cedula: number;
  correo: string;
  password: string;
  perfil: string;
}
