import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { VerifyUserModalModule } from '../../components/verify-user-modal/verify-user-modal.module';
import {PruebamoduleModule} from "../../components/pruebamodule/pruebamodule.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    VerifyUserModalModule,
    PruebamoduleModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent
      }
    ])
  ]
})
export class UserListModule { }
