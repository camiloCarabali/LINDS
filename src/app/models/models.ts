export interface UserLindsDatabase {
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
  empresa: string;
  sucursal: string;
  uid: string;
  nombre: string;
  cedula: number;
  correo: string;
  password: string;
  perfil: string;
}

export interface Viaje {
  uid:any;
  inicio: any;
  llegada: any
  coordenada: any
}

export interface Solicitud {
  inicio: string;
  llegada: string;
  uid: any;
}