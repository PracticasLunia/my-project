import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserLoginRegisterModule } from './user-login-register/user-login-register.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserLoginRegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
