import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebamoduleComponent } from './pruebamodule.component';

describe('PruebamoduleComponent', () => {
  let component: PruebamoduleComponent;
  let fixture: ComponentFixture<PruebamoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebamoduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebamoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
