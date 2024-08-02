import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAreaComponent } from './admin-area.component';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { AdminNavbarModule } from '../../components/admin-navbar/admin-navbar.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminAreaComponent
  ],
  imports: [
    CommonModule,
    AdminNavbarModule,
    RouterModule.forChild([
      {
          path: '',
          component: AdminAreaComponent
      }
  ]),
  ]
})
export class AdminAreaModule { }
