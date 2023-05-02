import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CrearEditarEmpresaComponent } from './crear-editar-empresa.component';
import { CommonModule } from '@angular/common';


describe('CrearEditarSucursalComponent', () => {
  let component: CrearEditarEmpresaComponent;
  let fixture: ComponentFixture<CrearEditarEmpresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarEmpresaComponent ],
      imports: [IonicModule.forRoot(), CommonModule, IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearEditarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
