import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreaComponent } from './admin-area.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  template: '<div>Navbar</div>'
})
class MockNavbarComponent {}

@Component({
  selector: 'app-find-your-book',
  template: '<div>Home</div>'
})
class MockFindYourBookComponent {}

describe('AdminAreaComponent', () => {
  let component: AdminAreaComponent;
  let fixture: ComponentFixture<AdminAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAreaComponent, MockNavbarComponent, MockFindYourBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
