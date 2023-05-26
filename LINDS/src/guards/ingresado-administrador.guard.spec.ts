import { TestBed } from '@angular/core/testing';

import { IngresadoAdministradorGuard } from './ingresado-administrador.guard';

describe('IngresadoAdministradorGuard', () => {
  let guard: IngresadoAdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IngresadoAdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
