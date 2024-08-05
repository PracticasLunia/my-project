import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReaderComponent } from './book-reader.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [
    BookReaderComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule
  ],
  exports: [
    BookReaderComponent
  ]
})
export class BookReaderModule { }
