import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearEditarPuntoEntregaComponent } from './crear-editar-punto-entrega.component';

describe('CrearEditarPuntoEntregaComponent', () => {
  let component: CrearEditarPuntoEntregaComponent;
  let fixture: ComponentFixture<CrearEditarPuntoEntregaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarPuntoEntregaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearEditarPuntoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
