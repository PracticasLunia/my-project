import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListModule } from './pages/user-list/user-list.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UserListModule
  ]
})
export class AdminModule { }
