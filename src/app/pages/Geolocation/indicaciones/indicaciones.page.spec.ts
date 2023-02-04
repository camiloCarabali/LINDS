import {  async ,ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { IndicacionesPage } from './indicaciones.page';

describe('IndicacionesPage', () => {
  let component: IndicacionesPage;
  let fixture: ComponentFixture<IndicacionesPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ IndicacionesPage ],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

    
  beforeEach(() =>{
    fixture = TestBed.createComponent(IndicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
