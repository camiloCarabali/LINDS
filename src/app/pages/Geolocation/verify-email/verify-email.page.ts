import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  user$: Observable<User>= this.authService.authFirebase.user;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async onSendEmail(){
    try {
      await this.authService.sendVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authService.logout();
  }

}
