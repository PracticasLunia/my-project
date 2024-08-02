import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/services/user/admin/admin.service';
import { SearchSimilarService } from '../../services/search-similar/search-similar.service';
import { Book } from '../../models/book';
import { SearchUserPreferencesService } from '../../services/search-user-preferences/search-user-preferences.service';

@Component({
  selector: 'app-find-your-book',
  templateUrl: './find-your-book.component.html',
  styleUrl: './find-your-book.component.css'
})
export class FindYourBookComponent {
  books: Book[] = [];
  searchButtonText: string = "Search description";
  searching: boolean = false;
  searchButtonText2: string = "Search your user preferences";
  searching2: boolean = false;

  constructor(
    private searchSimilarService: SearchSimilarService,
    private searchUserPreferencesService: SearchUserPreferencesService
  ){}

  searchUserPreferences(){
    this.searching2 = true;
    this.searchButtonText2 = "Searching..."
    this.searchUserPreferencesService.searchUserPreferences().subscribe((books) => {
      this.searching2 = false;
      this.books = books;
      this.searchButtonText2 = "Search description";
    }, (error) => {
      this.searching2 = false;
      this.searchButtonText2 = "Search description";
    })
  }

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
