import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndicacionesPage } from './indicaciones.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('IndicacionesPage', () => {
  let component: IndicacionesPage;
  let fixture: ComponentFixture<IndicacionesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicacionesPage ],
      imports: [IonicModule.forRoot(),
      RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IndicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
