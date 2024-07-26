import { Component, OnInit } from '@angular/core';
import { FindService } from '../../services/book/find/find.service';
import { Book } from '../../../shared/models/book';
import { DeleteService } from '../../services/book/delete/delete.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  bookList: Book[] = [];
  searchTitle: string = "";
  searchAuthor: string ="";

  constructor(
    private findService: FindService,
    private deleteService: DeleteService
  ){ }

  ngOnInit(): void {
    this.findService.find('', '').subscribe((data) => {
      this.bookList = data;
    })
  }

  searchBooks(): void {
    this.findService.find(this.searchTitle, this.searchAuthor).subscribe((data) => {
      this.bookList = data;
    })
  }

  deleteBook(isbn: string): void {
    this.deleteService.delete(isbn).subscribe(() => {
      this.searchBooks();
    })
  }
}
