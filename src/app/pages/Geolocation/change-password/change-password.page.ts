import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'app/models/models';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  uid: string = null;
  info: Usuario = null;

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService,
    private router: Router,
    public modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    this.auth.stateUser().subscribe(() => {
      this.getUid();
    });
    this.getUid();
  }

  async reestablecer(){
    try {
      await this.auth.resertPassword(this.info.correo);
      this.auth.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
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
