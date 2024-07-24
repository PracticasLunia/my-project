import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  //{path:'', redirectTo:"/login-register", pathMatch:'full'},
  {
    path: '',
    loadChildren: () => import('./admin/pages/user-list/user-list.module').then(m => m.UserListModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./public/pages/user-login-register/user-login-register.module').then(m => m.UserLoginRegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
