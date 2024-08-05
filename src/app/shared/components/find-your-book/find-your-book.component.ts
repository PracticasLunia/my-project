import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/services/user/admin/admin.service';
import { SearchSimilarService } from '../../services/search-similar/search-similar.service';
import { Book } from '../../models/book';
import { SearchUserPreferencesService } from '../../services/search-user-preferences/search-user-preferences.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-your-book',
  templateUrl: './find-your-book.component.html',
  styleUrl: './find-your-book.component.css'
})
export class FindYourBookComponent implements OnInit {
  books: Book[] = [];
  bookPreferences: Book[] = [];
  searchButtonText: string = "Search";
  searching: boolean = false;

  constructor(
    private searchSimilarService: SearchSimilarService,
    private searchUserPreferencesService: SearchUserPreferencesService,
    private cookieService: CookieService,
    private router: Router
  ){}

  ngOnInit(){
    this.searchUserPreferencesService.searchUserPreferences().subscribe((books) => {
      this.bookPreferences = books;
    }, (error) => {
    })
  }

  logout(){
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.router.navigate(['/login']);
  }

  onSubmit(data: any){
    this.searching = true;
    this.searchButtonText = "Searching..."
    this.searchSimilarService.searchSimilar(data.description).subscribe((books) => {
      this.searching = false;
      this.books = books;
      this.searchButtonText = "Search";
    }, (error) => {
      this.searching = false;
      this.searchButtonText = "Search";
    })
  }
}
