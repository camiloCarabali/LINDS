import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginGeoPage } from './login-geo.page';
import { RouterTestingModule } from '@angular/router/testing';


describe('AdministradorPage', () => {
  let component: LoginGeoPage;
  let fixture: ComponentFixture<LoginGeoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginGeoPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginGeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
