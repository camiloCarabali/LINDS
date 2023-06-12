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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Mensaje Importante',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlert1(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Mensaje Importante',
      message: message,
      buttons: this.buttonsOn,
    });
    await alert.present();
  }

  public buttonsOn: any = [
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
      },
    },
  ];

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

  async showLoading(message: string) {
    this.loading = true;
    return await this.loadingCtrl
      .create({
        message: message,
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.loading) {
            a.dismiss();
          }
        });
      });
  }

  async closeLoading() {
    return await this.loadingCtrl.dismiss();
  }
}
