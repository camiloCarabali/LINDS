import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'app/models/models';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  uid: string = null;
  info: Usuario = null;
  constructor(
    private firestore: FirestoreService,
    public modalCtrl: ModalController,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    this.auth.stateUser().subscribe(() => {
      this.getUid();
    });
    this.getUid();
  }

  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      this.getInfoUser();
    } 
  }

  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid; 
    this.firestore.getDoc<Usuario>(path, id).subscribe((res) => {
      if(res){
        this.info = res;
      }
    });
  }
}
