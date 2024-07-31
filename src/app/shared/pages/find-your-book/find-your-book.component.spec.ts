import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindYourBookComponent } from './find-your-book.component';

describe('FindYourBookComponent', () => {
  let component: FindYourBookComponent;
  let fixture: ComponentFixture<FindYourBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindYourBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindYourBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
