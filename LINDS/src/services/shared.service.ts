import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIURL = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getDepartamentoList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'departamento/');
  }

  getRolList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/rol/');
  }

  getMunicipioList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/municipio/');
  }

  getEmpresaList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/empresa/');
  }

  getBuscarEmpresa(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarEmpresa/' + val);
  }

  getBuscarMunicipio(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarMunicipio/' + val);
  }

  getBuscarSucursal(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarSucursal/' + val);
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

  inactivarSucursal(val: string) {
    return this.http.put<any[]>(this.APIURL + 'inactivarSucursal/' + val, val);
  }

  getUsuarioList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/usuario/');
  }

  addUsuario(val: any) {
    return this.http.post<any[]>(this.APIURL + '/registro', val);
  }

  updateUsuario(val: any) {
    return this.http.put<any[]>(this.APIURL + '/modificarUsuario/', val);
  }

  inactivarUsuario(val: any) {
    return this.http.put<any[]>(this.APIURL + 'inactivarUsuario/' + val, val);
  }

  correo(val: any) {
    return this.http.post<any[]>(this.APIURL + 'correo/', val);
  }

  getAllUsuarioNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/sucursal/');
  }
}