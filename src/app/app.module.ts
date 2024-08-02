import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
