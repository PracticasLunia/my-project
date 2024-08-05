import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VerifyUserModalModule } from "../../components/import-book-modal/import-book-modal.module";
import { GenerateCoverModule } from "../../components/generate-cover/generate-cover.module";
import { AdminNavbarModule } from '../../components/admin-navbar/admin-navbar.module';



@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: BookListComponent
        }
    ]),
    FormsModule,
    VerifyUserModalModule,
    GenerateCoverModule,
    AdminNavbarModule
]
})
export class BookListModule { }
