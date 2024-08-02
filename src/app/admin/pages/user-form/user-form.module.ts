import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../../../shared/components/navbar/navbar.module';
import { AdminNavbarModule } from '../../components/admin-navbar/admin-navbar.module';



@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserFormComponent
      }
    ]),
    NavbarModule,
    AdminNavbarModule
  ],
})
export class UserFormModule { }
