import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { VerifyUserModalModule } from '../../components/verify-user-modal/verify-user-modal.module';
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AdminNavbarModule } from '../../components/admin-navbar/admin-navbar.module';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    VerifyUserModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent
      }
    ]),
    FormsModule,
    AdminNavbarModule
  ]
})
export class UserListModule { }
