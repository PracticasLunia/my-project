import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { RecoverPasswordFormComponent } from './recover-password-form.component';
import { RecoverPasswordService } from '../../services/recover-password/recover-password.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecoverPasswordFormComponent', () => {
  let component: RecoverPasswordFormComponent;
  let fixture: ComponentFixture<RecoverPasswordFormComponent>;
  let recoverPasswordService: jasmine.SpyObj<RecoverPasswordService>;

  beforeEach(async () => {
    const recoverPasswordSpy = jasmine.createSpyObj('RecoverPasswordService', ['recoverPassword']);

    await TestBed.configureTestingModule({
      declarations: [RecoverPasswordFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: RecoverPasswordService, useValue: recoverPasswordSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordFormComponent);
    component = fixture.componentInstance;
    recoverPasswordService = TestBed.inject(RecoverPasswordService) as jasmine.SpyObj<RecoverPasswordService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.userForm).toBeDefined();
    expect(component.userForm.controls['email']).toBeDefined();
  });

  it('should show an error if form is invalid', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.userForm.setValue({
      email: '',
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Form is invalid');
    expect(component.logging).toBe(false);
    expect(component.buttonText).toBe('Recover password');
  });

  it('should call recoverPasswordService and change text button on success', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.userForm.setValue({
      email: 'test@email.com',
    });

    recoverPasswordService.recoverPassword.and.returnValue(of(void 1));

    component.onSubmit();
    fixture.detectChanges();

    expect(recoverPasswordService.recoverPassword).toHaveBeenCalledWith('test@email.com');
    expect(component.logging).toBe(true);
    expect(component.buttonText).toBe('Please, check your email');
    expect(component.errorMessage).toBe('');
  });

  it('should show an error message on recover failure', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.userForm.setValue({
      email: 'test@email.com',
    });

    recoverPasswordService.recoverPassword.and.returnValue(throwError('error'));

    component.onSubmit();
    fixture.detectChanges();

    expect(recoverPasswordService.recoverPassword).toHaveBeenCalledWith('test@email.com');
    expect(component.errorMessage).toBe('Some error happend or user not exists');
    expect(component.logging).toBe(false);
    expect(component.buttonText).toBe('Recover password');
  });
});
