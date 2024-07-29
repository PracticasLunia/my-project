import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UserFormComponent } from './user-form.component';
import { GetService } from '../../services/user/get/get.service';
import { UpdateService } from '../../services/user/update/update.service';
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: '<div>Navbar</div>'
})
class MockNavbarComponent {}

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: () => '1'
    }
  };
}

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let getService: GetService;
  let ngZone: NgZone;
  let route: ActivatedRoute;
  let updateService: UpdateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent, MockNavbarComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{path: 'users', redirectTo: ''}]
      )],
      providers: [
        FormBuilder,
        { provide: GetService, useValue: { get: jasmine.createSpy('get').and.returnValue(of({ id: 1, name: 'Test User', email: 'test@example.com', password: '1234', admin: false})) } },
        { provide: UpdateService, useValue: { update: jasmine.createSpy('update').and.returnValue(of(void 1)) } },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    ngZone = TestBed.inject(NgZone);
    route = TestBed.inject(ActivatedRoute)
    getService = TestBed.inject(GetService);
    updateService = TestBed.inject(UpdateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm.controls['name']).toBeDefined();
    expect(component.userForm.controls['email']).toBeDefined();
    expect(component.userForm.controls['password']).toBeDefined();
    expect(component.userForm.controls['admin']).toBeDefined();
  });

  it('should load user data on init if id is present', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(getService.get).toHaveBeenCalledWith(1);
    expect(component.userForm.value).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      password: '',
      admin: false
    });
  });

  it('should not load user data on init if id is not present', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue("");

    component.ngOnInit();
    fixture.detectChanges();
    expect(getService.get).toHaveBeenCalledWith(1);
    expect(component.userForm.value).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      password: '',
      admin: false
    });
  });

  it('should call updateService.update when form is valid and submitted', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue("");
    component.ngOnInit();
    fixture.detectChanges();

    component.userForm.setValue({
      name: 'Updated User',
      email: 'updated@example.com',
      password: '1234',
      admin: true,
    });

    ngZone.run(() => {
      component.onSubmit();
      expect(updateService.update).toHaveBeenCalledWith(-1, {
        name: 'Updated User',
        email: 'updated@example.com',
        password: '1234',
        admin: true,
      });
    });
  });

  it('should use oldPassword when form is valid but no password submitted', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue("");
    component.ngOnInit();
    fixture.detectChanges();

    component.userOldPassword = 'test'
    component.userForm.setValue({
      name: 'Updated User',
      email: 'updated@example.com',
      password: '',
      admin: true,
    });

    ngZone.run(() => {
      component.onSubmit();
      expect(updateService.update).toHaveBeenCalledWith(-1, {
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'test',
        admin: true,
      });
    });
  });
});
