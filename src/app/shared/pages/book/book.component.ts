import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { GetService } from '../../services/book/get/get.service';
import { GetService as GetCategoryService } from '../../services/category/get/get.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { DownloadService } from '../../services/download/download.service';
import download from "downloadjs";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  book: Book | null = null;
  date: string = "";
  error: string = "";
  category: Category | null = null;
  fileUrl: string = '';

  constructor(
    private getBookSerivce: GetService,
    private getCategoryService: GetCategoryService,
    private activatedRoute: ActivatedRoute,
    private downloadService: DownloadService
  ){}

  ngOnInit(): void {
    const isbn = this.activatedRoute.snapshot.paramMap.get('isbn') || '';
    this.getBookSerivce.get(isbn).subscribe((book) => {
      this.book = book;
      this.date = this.book.publicationDate.toString()?.split('T')[0]
      if (book.category){
        this.getCategoryService.get(book.category).subscribe((category) => {
          this.category = category
        })
      }
    }, (error) => {
      this.error = "Error, book not finded"
    })
  }

  downloadBook() {
    const isbn = this.activatedRoute.snapshot.paramMap.get('isbn') || '';
    if (isbn.length > 0){
      this.downloadService.download(isbn).subscribe((res) => {
        const data = res.body as Blob;
        if (this.book){
          download(data, this.book?.title + '.pdf');
        }
      });
    }
  }

  
}
