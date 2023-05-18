import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearEditarMercanciaComponent } from './crear-editar-mercancia.component';

describe('CrearEditarMercanciaComponent', () => {
  let component: CrearEditarMercanciaComponent;
  let fixture: ComponentFixture<CrearEditarMercanciaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarMercanciaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearEditarMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
