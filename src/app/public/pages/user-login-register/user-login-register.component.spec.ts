import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLoginRegisterComponent } from './user-login-register.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  template: '<div>Login Form</div>'
})
class MockLoginFormComponent {}

@Component({
  selector: 'app-register-form',
  template: '<div>Register Form</div>'
})
class MockRegisterFormComponent {}

describe('UserLoginRegisterComponent', () => {
  let component: UserLoginRegisterComponent;
  let fixture: ComponentFixture<UserLoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserLoginRegisterComponent,
        MockLoginFormComponent,
        MockRegisterFormComponent
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login and the register form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-register-form')).not.toBeNull()
    expect(compiled.querySelector('app-login-form')).not.toBeNull()
  });
});

