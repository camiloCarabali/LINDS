import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from 'app/models/models';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  rutaInicio: string = '';
  rutaLlegada: string = '';
  info: Solicitud = null;
  todoList = [];
  historiales = [];
  historialesId = [];
  dataHistorial = [];
  uid: string = null;
  taskObject;
  today: number = Date.now();

  constructor(private firestore: FirestoreService, private auth: AuthService, private router: Router) {
    //this.cargarStorage();
  }

  ngOnInit() {
    this.auth.stateUser().subscribe(() => {
      this.getUid();
    });
  }

  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
    }
    this.cargarHistorial(uid);
    this.cargarSolicitudes();
  }

  async addTask(inicio, llegada) {
    this.taskObject = {
      itemFrom: inicio,
      itemTo: llegada,
      itemDate: this.today,
    };
    this.todoList.push(this.taskObject);
    this.guardarStorage();
  }

  guardarStorage() {
    let stringLista: string = JSON.stringify(this.todoList);
    localStorage.setItem('historial', stringLista);
  }

  cargarStorage() {
    const listaStorage = localStorage.getItem('historial');
    if (listaStorage == null) {
      return (this.todoList = []);
    }
    let objLista = JSON.parse(listaStorage);
    this.todoList = objLista;
  }

  cargarViaje() {
    this.rutaInicio = this.info.inicio;
    this.rutaLlegada = this.info.llegada;
    localStorage.setItem('rutaInicio', this.rutaInicio)
    localStorage.setItem('rutaLlegada', this.rutaLlegada)
    this.router.navigate(['/conductor']);
  }


  async cargarHistorial(uid) {
    this.historialesId.splice(0, this.historialesId.length);
    this.dataHistorial.splice(0, this.dataHistorial.length);
    this.firestore.showHistorial(uid).then((firebaseResponse) => {
      firebaseResponse.subscribe((historialesRef) => {
        this.historiales = historialesRef.map((historialRef) => {
          this.historialesId.push(historialRef.payload.doc.id);
          this.dataHistorial.push(historialRef.payload.doc.data());
        });
      });
    });
  }

  async cargarSolicitudes() {
    const id = this.uid;
    await this.firestore
      .getDoc<Solicitud>('Solicitudes', id)
      .subscribe((res) => {
        if (res) {
          this.info = res;
        }
      });
  }
}
