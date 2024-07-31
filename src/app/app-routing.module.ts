import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { VerifiedGuard } from './guards/verified.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-register',
    pathMatch: 'full'
  },
  {
    path: 'login-register',
    loadChildren: () => import('./public/pages/user-login-register/user-login-register.module').then(m => m.UserLoginRegisterModule)
  },
  {
    path: 'not-verified',
    loadChildren: () => import('./public/pages/not-verified/not-verified.module').then(m => m.NotVerifiedModule)
  },
  {
    path: 'not-admin',
    loadChildren: () => import('./public/pages/not-admin/not-admin.module').then(m => m.NotAdminModule)
  },


  {
    path: 'user/edit/:id',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/pages/user-form/user-form.module').then(m => m.UserFormModule)
  },
  {
    path: 'users',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/pages/user-list/user-list.module').then(m => m.UserListModule)
  },

  {
    path: 'categories',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/pages/category-list/category-list.module').then(m => m.CategoryListModule)
  },

  {
    path: 'books',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/pages/book-list/book-list.module').then(m => m.BookListModule)
  },
  {
    path: 'book/create',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/pages/book-form/book-form.module').then(m => m.BookFormModule)
  },
  {
    path: 'book/edit/:isbn',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/pages/book-form/book-form.module').then(m => m.BookFormModule)
  },
  /*{
    path: "**",
    redirectTo: "not-admin",
    pathMatch: "full",
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
