import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/services/user/admin/admin.service';
import { SearchSimilarService } from '../../services/search-similar/search-similar.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-find-your-book',
  templateUrl: './find-your-book.component.html',
  styleUrl: './find-your-book.component.css'
})
export class FindYourBookComponent {
  books: Book[] = [];
  searchButtonText: string = "Search description";
  searching: boolean = false;

  constructor(
    private searchSimilarService: SearchSimilarService
  ){}

  onSubmit(data: any){
    this.searching = true;
    this.searchButtonText = "Searching..."
    this.searchSimilarService.searchSimilar(data.description).subscribe((books) => {
      this.searching = false;
      this.books = books;
      this.searchButtonText = "Search description";
    }, (error) => {
      this.searching = false;
      this.searchButtonText = "Search description";
    })
  }
}
