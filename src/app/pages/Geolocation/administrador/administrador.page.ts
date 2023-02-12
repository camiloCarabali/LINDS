import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { Usuario } from 'app/models/models';
import { Viaje } from 'app/models/models';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  today: number = Date.now();

  lista = []
  listaId: string
  public coord = []
  public to: string;
  public from: string

  constructor(private firestore: FirestoreService, private auth: AuthService) { }

  ngOnInit() {
    this.getUid();
  }

  async getUid(){
    const uid = await this.auth.getUid();
    this.getInfoUser(uid)
  }

  
  async buscarViaje(id){
    this.firestore.getDoc<Viaje>('Viajes', id).subscribe((res) => {
      if(res){
        this.to = res.inicio;
        this.from = res.llegada;
        this.coord = res.coordenada;
      }
    })
  }


  async buscarConductor(sucursal) {
    this.firestore.searchConductor(sucursal).then((firebaseResponse) => {
      firebaseResponse.subscribe((usuariosRef) => {
        this.lista = usuariosRef.map((usuarioRef) => {
          let usuario = usuarioRef.payload.doc.data();
          //usuario['id'] = usuarioRef.payload.doc.id;
          this.listaId = usuarioRef.payload.doc.id;
          //let size = this.listaId.length
          this.buscarViaje(this.listaId);
        });
      });
    });
  }

  getInfoUser(uid) {
    const path = 'Usuarios';
    const id = uid;
    let sucursal = ''; 
    this.firestore.getDoc<Usuario>(path, id).subscribe((res) => {
      if(res){
        sucursal = res.sucursal;
        this.buscarConductor(sucursal);
      }
    });
  }

}
