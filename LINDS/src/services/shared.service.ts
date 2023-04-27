import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIURL = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getBuscarEmpresa(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarEmpresa/' + val);
  }

  getBuscarMunicipio(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarMunicipio/' + val);
  }

  getSucursalList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/sucursal/');
  }

  addSucursal(val: any) {
    return this.http.post<any[]>(this.APIURL + '/crearSucursal/', val);
  }

  updateSucursal(val: any) {
    return this.http.put<any[]>(this.APIURL + '/modificarSucursal/', val);
  }

  deleteSucursal(val: any) {
    return this.http.delete<any[]>(this.APIURL + '/eliminarSucursal/', val);
  }

  getUsuarioList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/usuario/');
  }

  addUsuario(val: any) {
    return this.http.post<any[]>(this.APIURL + '/crearUsuario/', val);
  }

  updateUsuario(val: any) {
    return this.http.put<any[]>(this.APIURL + '/modificarUsuario/', val);
  }

  deleteUsuario(val: any) {
    return this.http.delete<any[]>(this.APIURL + '/eliminarUsuario/', val);
  }

  getAllUsuarioNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/sucursal/');
  }
}