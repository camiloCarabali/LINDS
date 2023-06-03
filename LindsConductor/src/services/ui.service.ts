import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  handlerMessage = '';
  loading = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private service: SharedService
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

  async presentDecisionAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Mensaje Importante',
      message: message,
      buttons: this.buttonsOn,
    });
    alert.present();
  }

  public buttonsOn: any = [
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.service.finalViaje(localStorage.getItem('id')).subscribe((data) => {});
        this.service.disponibleCamion(localStorage.getItem('camion')).subscribe(() => {});
        this.service.disponibleUsuario(localStorage.getItem('usuario')).subscribe(() => {});
        this.router.navigate(['/perfil']);
      }, 
    },
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'Cancel';
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
    const loading = await this.loadingCtrl.create({
      message: message,
    });

    await loading.present();
  }

  async closeLoading() {
    return await this.loadingCtrl.dismiss();
  }
}
