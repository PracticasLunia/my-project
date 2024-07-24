import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { VerifyUserModalModule } from '../../components/verify-user-modal/verify-user-modal.module';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    VerifyUserModalModule
  ]
})
export class UserListModule { }
