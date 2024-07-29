import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAdminComponent } from './not-admin.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotAdminComponent', () => {
  let component: NotAdminComponent;
  let fixture: ComponentFixture<NotAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotAdminComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
