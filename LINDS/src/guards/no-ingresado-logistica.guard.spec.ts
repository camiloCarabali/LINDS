import { TestBed } from '@angular/core/testing';

import { NoIngresadoLogisticaGuard } from './no-ingresado-logistica.guard';

describe('NoIngresadoLogisticaGuard', () => {
  let guard: NoIngresadoLogisticaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoIngresadoLogisticaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
