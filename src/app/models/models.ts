export interface UserLindsDatabase {
    nombre: string;
    correo: string;
    uid: string;
    password: string;
    perfil: "administrador"
}

export interface Empresa {
    nombre: string;
    nit: number;
}

export interface Sucursal {
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
    cedula: string;
    correo: string;
    perfil: string;
}