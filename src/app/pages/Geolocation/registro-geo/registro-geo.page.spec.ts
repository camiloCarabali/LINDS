import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroGeoPage } from './registro-geo.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistroGeoPage', () => {
  let component: RegistroGeoPage;
  let fixture: ComponentFixture<RegistroGeoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroGeoPage ],
      imports: [IonicModule.forRoot(),
      RegistroGeoPage]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroGeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
