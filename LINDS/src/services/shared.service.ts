import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIURL = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getRolList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/rol/');
  }

  getEmpresaList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'empresa/');
  }

  getBuscarEmpresa(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarEmpresa/' + val);
  }

  getBuscarSucursal(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarSucursal/' + val);
  }

  addEmpresa(val: any) {
    return this.http.post<any[]>(this.APIURL + '/crearEmpresa/', val);
  }

  updateEmpresa(val: any) {
    return this.http.put<any[]>(this.APIURL + 'modificarEmpresa/', val);
  }

  inactivarEmpresa(val: string) {
    return this.http.put<any[]>(this.APIURL + 'inactivarEmpresa/' + val, val);
  }

  getPaisList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'pais/');
  }

  getBuscarPais(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarPais/' + val);
  }

  getMunicipioList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/municipio/');
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

  inactivarSucursal(val: string) {
    return this.http.put<any[]>(this.APIURL + 'inactivarSucursal/' + val, val);
  }

  getUsuarioList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + '/usuario/');
  }

  addUsuario(val: any) {
    return this.http.post<any[]>(this.APIURL + 'registro', val, { observe: 'response' });
  }

  updateUsuario(val: any) {
    return this.http.put<any[]>(this.APIURL + '/modificarUsuario/', val);
  }

  inactivarUsuario(val: any) {
    return this.http.put<any[]>(this.APIURL + 'inactivarUsuario/'+ val, val);
  }

  correo(val: any) {
    return this.http.post<any[]>(this.APIURL + 'correo/', val);
  }

  login(val: any): Observable<any> {
    return this.http.post<any>(this.APIURL + 'login', val);
  }

  user(val: String) {
    return this.http.get<any[]>(this.APIURL + 'user/' + val);
  }
}