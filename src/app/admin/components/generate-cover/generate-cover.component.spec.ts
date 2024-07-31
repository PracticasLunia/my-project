import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCoverComponent } from './generate-cover.component';

describe('GenerateCoverComponent', () => {
  let component: GenerateCoverComponent;
  let fixture: ComponentFixture<GenerateCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateCoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
