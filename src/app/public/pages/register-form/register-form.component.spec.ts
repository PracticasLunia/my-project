import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterFormComponent } from './register-form.component';
import { RegisterService } from '../../services/register/register.service';
import { User } from '../../../shared/models/user';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let registerService: RegisterService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: RegisterService, useValue: { register: jasmine.createSpy('register') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService);
    router = TestBed.inject(Router);
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
  });

  it('should navigate to home when form is valid and submission is successful', () => {
    spyOn(router, 'navigate');
    const user: User | any = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
    (registerService.register as jasmine.Spy).and.returnValue(of(user));

    component.userForm.setValue(user);
    component.onSubmit();

    expect(registerService.register).toHaveBeenCalledWith(user);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display error message when form is valid but registration fails', () => {
    const errorResponse = { error: { error: 'Registration failed' } };
    (registerService.register as jasmine.Spy).and.returnValue(throwError(() => errorResponse));

    component.userForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    component.onSubmit();

    expect(component.errorMessage).toBe('Registration failed');
  });

  it('should display form invalid message when form is invalid and submitted', () => {
    component.userForm.setValue({
      name: '',
      email: '',
      password: ''
    });
    component.onSubmit();

    expect(component.errorMessage).toBe('Form is invalid');
  });
});
