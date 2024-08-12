import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { LoginFormComponent } from './login-form.component';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../../shared/models/user';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loginService: LoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: LoginService, useValue: { login: jasmine.createSpy('login') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm.controls['email']).toBeDefined();
    expect(component.userForm.controls['password']).toBeDefined();
  });

  it('should navigate to home when form is valid and login is successful', () => {
    spyOn(router, 'navigate');
    const user: User | any = { email: 'john@example.com', password: 'password123' };
    (loginService.login as jasmine.Spy).and.returnValue(of(user));

    component.userForm.setValue(user);
    component.onSubmit();

    expect(loginService.login).toHaveBeenCalledWith(user.email, user.password);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to admin area when form is valid and login is successful', () => {
    spyOn(router, 'navigate');
    const user: User | any = { email: 'john@example.com', password: 'password123', admin: true };
    (loginService.login as jasmine.Spy).and.returnValue(of(user));

    component.userForm.setValue({ email: 'john@example.com', password: 'password123' });
    component.onSubmit();

    expect(loginService.login).toHaveBeenCalledWith(user.email, user.password);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display error message when form is valid but login fails', () => {
    const errorResponse = { error: { error: 'Login failed' } };
    (loginService.login as jasmine.Spy).and.returnValue(throwError(() => errorResponse));

    component.userForm.setValue({
      email: 'john@example.com',
      password: 'password123'
    });
    component.onSubmit();

    expect(component.errorMessage).toBe('Login failed');
  });

  it('should display form invalid message when form is invalid and submitted', () => {
    component.userForm.setValue({
      email: '',
      password: ''
    });
    component.onSubmit();

    expect(component.errorMessage).toBe('Form is invalid');
  });
});
