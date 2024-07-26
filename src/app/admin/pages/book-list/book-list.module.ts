import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../../../shared/components/navbar/navbar.module';
import { FormsModule } from '@angular/forms';



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
    NavbarModule,
    FormsModule
  ]
})
export class BookListModule { }
