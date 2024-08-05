import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { VerifiedGuard } from './guards/verified.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [VerifiedGuard],
    loadChildren: () => import('./shared/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'book/:isbn',
    canActivate: [VerifiedGuard],
    loadChildren: () => import('./shared/pages/book/book.module').then(m => m.BookModule)
  },


  {
    path: 'login',
    loadChildren: () => import('./public/pages/login-form/login-form.module').then(m => m.LoginFormModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./public/pages/register-form/register-form.module').then(m => m.RegisterFormModule)
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
    path: 'mail-verify/:token',
    loadChildren: () => import('./public/pages/mail-verify/mail-verify.module').then(m => m.MailVerifyModule)
  },


  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/pages/admin-area/admin-area.module').then(m => m.AdminAreaModule)
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
