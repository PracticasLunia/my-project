import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAreaComponent } from './admin-area.component';
import { AdminNavbarModule } from '../../components/admin-navbar/admin-navbar.module';
import { RouterModule } from '@angular/router';
import { FindYourBookModule } from '../../../shared/components/find-your-book/find-your-book.module';



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
    FindYourBookModule
  ]
})
export class AdminAreaModule { }
