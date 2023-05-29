import { TestBed } from '@angular/core/testing';

import { IngresadoLogisticaGuard } from './ingresado-logistica.guard';

describe('IngresadoLogisticaGuard', () => {
  let guard: IngresadoLogisticaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IngresadoLogisticaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
