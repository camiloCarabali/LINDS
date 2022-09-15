import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiServiceService {
  loading = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 1500,
    });
    toast.present();
  }

  async showLoading(message: string) {
    this.loading = true;
    return await this.loadingCtrl.create({
      // eslint-disable-next-line object-shorthand
      message: message,
    }).then(a => {
      a.present().then(() => {
        if (!this.loading) {
          a.dismiss();
        }
      });
    });
  }

  async closeLoading() {
    this.loading = false;
    return await this.loadingCtrl.dismiss();
  }

}
