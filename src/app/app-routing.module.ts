import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginRegisterComponent } from './user-login-register/user-login-register.component';

const routes: Routes = [
  {path:'', redirectTo:"/login-register", pathMatch:'full'},
  {path:'login-register', component: UserLoginRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
