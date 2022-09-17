import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {

  constructor(
    private auth: AuthService,
    private router: Router,
    public modalCtrl: ModalController,
  ) { }

  async reestablecer(email){
    try {
      await this.auth.resertPassword(email);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
