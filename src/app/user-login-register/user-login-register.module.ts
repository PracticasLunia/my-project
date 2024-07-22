import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginRegisterComponent } from './user-login-register.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  declarations: [
    UserLoginRegisterComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserLoginRegisterModule { }
