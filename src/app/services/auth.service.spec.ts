import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;
  let taxServiceSpy;

  beforeEach(() => {
    taxServiceSpy = jasmine.createSpyObj('TaxService', {

    })
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
