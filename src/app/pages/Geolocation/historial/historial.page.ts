import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {


  todoList = [];
  taskObject;
  today: number = Date.now();

  constructor() {
    this.cargarStorage();
  }

  ngOnInit() {
    
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

  guardarStorage(){
    let stringLista: string = JSON.stringify(this.todoList);
    localStorage.setItem('historial', stringLista);
  }

  cargarStorage(){
    const listaStorage = localStorage.getItem('historial');
    if (listaStorage  == null){
      return this.todoList = [];
    }
    let objLista = JSON.parse(listaStorage);
    this.todoList = objLista;
  }
}
