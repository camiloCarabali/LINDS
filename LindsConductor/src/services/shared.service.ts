import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIURL = 'http://18.118.155.123:8000/';

  constructor(private http: HttpClient) {}

  getHistorial(val: String) {
    return this.http.get<any[]>(this.APIURL + 'historialViaje/' + val);
  }

  getAsignacion(val: String) {
    return this.http.get<any[]>(this.APIURL + 'asignacionViaje/' + val);
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

  waypoints(val: String) {
    return this.http.get<any[]>(this.APIURL + 'waypoints/' + val);
  }

  getEntregas(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarPuntoEntrega/' + val);
  }

  getMercanciaList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + 'mercancia/');
  }

  getMercanciaViajeList(val: string) {
    return this.http.get<any[]>(this.APIURL + 'mostrarMercanciaViaje/' + val);
  }

  buscarMercancia(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarMercancia/' + val);
  }

  infoViaje(val: String) {
    return this.http.get<any[]>(this.APIURL + 'infoViaje/' + val);
  }

  descargaMercancia(val: any) {
    return this.http.put<any[]>(this.APIURL + 'descargaMercancia/' + val, val, {
      observe: 'response',
    });
  }

  inicioViaje(val: any) {
    return this.http.put<any[]>(
      this.APIURL + 'confirmarInicioViaje/' + val,
      val,
      {
        observe: 'response',
      }
    );
  }

  finalViaje(val: any) {
    return this.http.put<any[]>(
      this.APIURL + 'confirmarFinalViaje/' + val,
      val,
      {
        observe: 'response',
      }
    );
  }

  enviadoMercancia(val: any) {
    return this.http.put<any[]>(this.APIURL + 'enviadoMercancia/' + val, val);
  }

  entregadoMercancia(val: any) {
    return this.http.put<any[]>(this.APIURL + 'entregadoMercancia/' + val, val);
  }

  disponibleCamion(val: any) {
    return this.http.put<any[]>(this.APIURL + 'disponibleCamion/' + val, val);
  }

  disponibleUsuario(val: any) {
    return this.http.put<any[]>(this.APIURL + 'disponibleUsuario/' + val, val);
  }

  direccionSucursal(val: String) {
    return this.http.get<any[]>(this.APIURL + 'direccionSucursal/' + val);
  }
}
