import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyEmailPage } from './verify-email.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('VerifyEmailPage', () => {
  let component: VerifyEmailPage;
  let fixture: ComponentFixture<VerifyEmailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailPage ],
      imports: [IonicModule.forRoot(),
      RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
