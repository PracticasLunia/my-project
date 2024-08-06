import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { UpdatePasswordFormComponent } from './update-password-form.component';
import { UpdatePasswordService } from '../../services/update-password/update-password.service';

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('test-token')
    }
  };
}

describe('UpdatePasswordFormComponent', () => {
  let component: UpdatePasswordFormComponent;
  let fixture: ComponentFixture<UpdatePasswordFormComponent>;
  let updatePasswordService: jasmine.SpyObj<UpdatePasswordService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    const updatePasswordSpy = jasmine.createSpyObj('UpdatePasswordService', ['updatePassword']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [UpdatePasswordFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UpdatePasswordService, useValue: updatePasswordSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordFormComponent);
    component = fixture.componentInstance;
    updatePasswordService = TestBed.inject(UpdatePasswordService) as jasmine.SpyObj<UpdatePasswordService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.userForm).toBeDefined();
    expect(component.userForm.controls['password']).toBeDefined();
    expect(component.userForm.controls['repeatPassword']).toBeDefined();
  });

  it('should show an error if passwords do not match', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.userForm.setValue({
      password: 'password123',
      repeatPassword: 'password456'
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Passwords are not equal');
    expect(component.logging).toBe(false);
    expect(component.buttonText).toBe('Update password');
  });

  it('should show an error if form is invalid', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.userForm.setValue({
      password: '',
      repeatPassword: ''
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Form is invalid');
    expect(component.logging).toBe(false);
    expect(component.buttonText).toBe('Update password');
  });

  it('should call updatePasswordService and navigate to login on success', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.userForm.setValue({
      password: 'password123',
      repeatPassword: 'password123'
    });

    updatePasswordService.updatePassword.and.returnValue(of(void 1));

    component.onSubmit();
    fixture.detectChanges();

    expect(updatePasswordService.updatePassword).toHaveBeenCalledWith('test-token', 'password123');
    expect(component.logging).toBe(true);
    expect(component.buttonText).toBe('Updated, go login');
    expect(component.errorMessage).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call updatePasswordService and navigate to login on success', () => {
    component.ngOnInit();
    fixture.detectChanges();
    activatedRoute.snapshot.paramMap.get.and.returnValue(null)
    component.userForm.setValue({
      password: 'password123',
      repeatPassword: 'password123'
    });

    updatePasswordService.updatePassword.and.returnValue(of(void 1));

    component.onSubmit();
    fixture.detectChanges();

    expect(updatePasswordService.updatePassword).toHaveBeenCalledWith('', 'password123');
    expect(component.logging).toBe(true);
    expect(component.buttonText).toBe('Updated, go login');
    expect(component.errorMessage).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show an error message on update failure', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.userForm.setValue({
      password: 'password123',
      repeatPassword: 'password123'
    });

    updatePasswordService.updatePassword.and.returnValue(throwError('error'));

    component.onSubmit();
    fixture.detectChanges();

    expect(updatePasswordService.updatePassword).toHaveBeenCalledWith('test-token', 'password123');
    expect(component.errorMessage).toBe('Some error happend');
    expect(component.logging).toBe(false);
    expect(component.buttonText).toBe('Update password');
  });
});
