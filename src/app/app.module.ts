import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserLoginRegisterModule } from './public/pages/user-login-register/user-login-register.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginFormModule } from './public/components/login-form/login-form.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './shared/components/navbar/navbar.module'
import { JWTInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginFormModule,
    UserLoginRegisterModule,
    HttpClientModule,
    FormsModule,
    NavbarModule,
    CommonModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JWTInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
