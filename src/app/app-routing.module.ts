import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginRegisterComponent } from './public/pages/user-login-register/user-login-register.component';
import { UserListComponent } from './admin/pages/user-list/user-list.component';

const routes: Routes = [
  //{path:'', redirectTo:"/login-register", pathMatch:'full'},
  {path:'', component: UserListComponent},
  {path:'login-register', component: UserLoginRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
