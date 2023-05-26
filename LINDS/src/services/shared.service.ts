import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIURL = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getRolList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'rol/');
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
    return this.http.post<any[]>(this.APIURL + 'crearEmpresa/', val);
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
    return this.http.get<any[]>(this.APIURL + 'municipio/');
  }

  getDepartamentoList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'departamento/');
  }

  getBuscarMunicipio(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarMunicipio/' + val);
  }

  getSucursalList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'sucursal');
  }

  addSucursal(val: any) {
    return this.http.post<any[]>(this.APIURL + 'crearSucursal/', val);
  }

  updateSucursal(val: any) {
    return this.http.put<any[]>(this.APIURL + 'modificarSucursal/', val);
  }

  inactivarSucursal(val: string) {
    return this.http.put<any[]>(this.APIURL + 'inactivarSucursal/' + val, val);
  }

  getUsuarioList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'usuario/');
  }

  addUsuario(val: any) {
    return this.http.post<any[]>(this.APIURL + 'registro', val, {
      observe: 'response',
    });
  }

  updateUsuario(val: any) {
    return this.http.put<any[]>(this.APIURL + 'modificarUsuario/', val);
  }

  inactivarUsuario(val: any) {
    return this.http.put<any[]>(this.APIURL + 'inactivarUsuario/' + val, val);
  }

  correo(val: any) {
    return this.http.post<any[]>(this.APIURL + 'correo/', val);
  }

  login(val: any): Observable<any> {
    return this.http.post<any>(this.APIURL + 'login', val);
  }

  logout(): Observable<any[]> {
    return this.http.post<any[]>(this.APIURL + 'logout/', '');
  }

  user(val: String) {
    return this.http.get<any[]>(this.APIURL + 'user/' + val);
  }

  getCamionList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'camion/');
  }

  getCamionDisponibleList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'camionDisponible/');
  }

  addCamion(val: any) {
    return this.http.post<any[]>(this.APIURL + 'crearCamion/', val);
  }

  updateCamion(val: any) {
    return this.http.put<any[]>(this.APIURL + 'modificarCamion/', val);
  }

  eliminarCamion(val: string) {
    return this.http.delete<any[]>(this.APIURL + 'eliminarCamion/' + val);
  }

  getBuscarCamion(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarCamion/' + val);
  }

  getViajeList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'viaje/');
  }

  addViaje(val: any) {
    return this.http.post<any[]>(this.APIURL + 'crearViaje/', val);
  }

  updateViaje(val: any) {
    return this.http.put<any[]>(this.APIURL + 'modificarViaje/', val);
  }

  inactivarViaje(val: string) {
    return this.http.delete<any[]>(this.APIURL + 'inactivarViaje/' + val);
  }

  getBuscarConductor(val: string) {
    return this.http.get<any[]>(this.APIURL + 'buscarConductor/' + val);
  }

  getPuntoEntregaList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'puntoEntrega/');
  }

  addPuntoEntrega(val: any) {
    return this.http.post<any[]>(this.APIURL + 'crearPuntoEntrega/', val);
  }

  updatePuntoEntrega(val: any) {
    return this.http.put<any[]>(this.APIURL + 'modificarPuntoEntrega/', val);
  }

  eliminarPuntoEntrega(val: string) {
    return this.http.delete<any[]>(this.APIURL + 'eliminarPuntoEntrega/' + val);
  }

  activarPuntoEntrega(val: string) {
    return this.http.put<any[]>(
      this.APIURL + 'activarPuntoEntrega/' + val,
      val
    );
  }

  waypoints(val: String) {
    return this.http.get<any[]>(this.APIURL + 'waypoints/' + val);
  }

  getBuscarPeso(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarPeso/' + val);
  }

  getMercanciaList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'mercancia/');
  }

  addMercancia(val: any) {
    return this.http.post<any[]>(this.APIURL + 'crearMercancia/', val);
  }

  updateMercancia(val: any) {
    return this.http.put<any[]>(this.APIURL + 'modificarMercancia/', val);
  }

  eliminarMercancia(val: string) {
    return this.http.delete<any[]>(this.APIURL + 'eliminarMercancia/' + val);
  }

  cargaMercancia(val: any) {
    return this.http.put<any[]>(this.APIURL + 'cargaMercancia/' + val, val, {
      observe: 'response',
    });
  }

  disponibleCamion(val: any) {
    return this.http.put<any[]>(this.APIURL + 'disponibleCamion/', val);
  }

  ocupadoCamion(val: any) {
    return this.http.put<any[]>(this.APIURL + 'ocupadoCamion/' + val, val);
  }
}
