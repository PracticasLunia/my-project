import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginRegisterComponent } from './user-login-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormModule } from '../../components/register-form/register-form.module';
import { LoginFormModule } from '../../components/login-form/login-form.module';

@NgModule({
  declarations: [
    UserLoginRegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterFormModule,
    LoginFormModule
  ],
})
export class UserLoginRegisterModule { }
