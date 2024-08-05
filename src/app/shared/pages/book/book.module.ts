import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { RouterModule } from '@angular/router';
import { BookReaderModule } from "../../components/book-reader/book-reader.module";


@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: BookComponent
        }
    ]),
    BookReaderModule
]
})
export class BookModule { }
