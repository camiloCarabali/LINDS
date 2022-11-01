import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage  {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  async reestablecer(email){
    try {
      await this.auth.resertPassword(email);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

}
