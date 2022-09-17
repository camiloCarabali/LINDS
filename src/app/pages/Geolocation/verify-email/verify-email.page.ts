import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { UiServiceService } from 'app/services/ui-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  constructor(
    private authService: AuthService,
    private interaction: UiServiceService
  ) {}

  ngOnInit() {}

  async onSendEmail() {
    try {
      await this.authService.sendVerification();
      this.interaction.presentToast('Correo enviado');
    } catch (error) {
      console.log('Error->', error);
    }
  }

  ngOnDestroy() {
    this.authService.logout();
  }
}
