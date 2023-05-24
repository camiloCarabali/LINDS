import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIURL = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

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
    return this.http.post<any[]>(this.APIURL + 'mercancia/', '');
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

  buscarMercancia(val: String) {
    return this.http.get<any[]>(this.APIURL + 'buscarMercancia/' + val);
  }

/*
  cargaMercancia(val: any) {
    return this.http.put<any[]>(this.APIURL + 'cargaMercancia/', val, {
      observe: 'response'
    });
  }
*/

  descargaMercancia(val: any) {
    return this.http.put<any[]>(this.APIURL + 'descargaMercancia/' + val, val, {
      observe: 'response'
    });
  }

  confirmarViaje(val: any) {
    return this.http.put<any[]>(this.APIURL + 'confirmarViaje/' + val, val, {
      observe: 'response'
    });
  }

}