import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindYourBookComponent } from './find-your-book.component';
import { SearchSimilarService } from '../../services/search-similar/search-similar.service';
import { SearchUserPreferencesService } from '../../services/search-user-preferences/search-user-preferences.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';

describe('FindYourBookComponent', () => {
  let component: FindYourBookComponent;
  let fixture: ComponentFixture<FindYourBookComponent>;
  let searchSimilarService: jasmine.SpyObj<SearchSimilarService>;
  let searchUserPreferencesService: jasmine.SpyObj<SearchUserPreferencesService>;
  let cookieService: jasmine.SpyObj<CookieService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const searchSimilarSpy = jasmine.createSpyObj('SearchSimilarService', ['searchSimilar']);
    const searchUserPreferencesSpy = jasmine.createSpyObj('SearchUserPreferencesService', ['searchUserPreferences']);
    const cookieSpy = jasmine.createSpyObj('CookieService', ['delete']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FindYourBookComponent],
      providers: [
        { provide: SearchSimilarService, useValue: { searchSimilar: jasmine.createSpy('searchSimilar').and.returnValue(of({})) } },
        { provide: SearchUserPreferencesService, useValue: { searchUserPreferences: jasmine.createSpy('searchUserPreferences').and.returnValue(of({})) } },
        { provide: CookieService, useValue: cookieSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [
        FormsModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FindYourBookComponent);
    component = fixture.componentInstance;
    searchSimilarService = TestBed.inject(SearchSimilarService) as jasmine.SpyObj<SearchSimilarService>;
    searchUserPreferencesService = TestBed.inject(SearchUserPreferencesService) as jasmine.SpyObj<SearchUserPreferencesService>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user preferences on ngOnInit', () => {
    const mockBooks: Book[] = [{ title: 'Test Book', author: 'Test Author' } as Book];
    searchUserPreferencesService.searchUserPreferences.and.returnValue(of(mockBooks));
    fixture.detectChanges();
    component.ngOnInit();

    expect(searchUserPreferencesService.searchUserPreferences).toHaveBeenCalled();
    expect(component.bookPreferences).toEqual(mockBooks);
    expect(component.preferencesText).toBe("No books finded");
  });

  it('should handle error when initializing user preferences', () => {
    searchUserPreferencesService.searchUserPreferences.and.returnValue(throwError("error"));
    fixture.detectChanges();
    component.ngOnInit();

    expect(searchUserPreferencesService.searchUserPreferences).toHaveBeenCalled();
    expect(component.preferencesText).toBe("No books finded");
  });

  it('should delete cookies and navigate to login on logout', () => {
    component.logout();

    expect(cookieService.delete).toHaveBeenCalledWith('token');
    expect(cookieService.delete).toHaveBeenCalledWith('refreshToken');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should update books and searchButtonText on successful search', () => {
    const mockBooks: Book[] = [{ title: 'Test Book', author: 'Test Author' } as Book];
    searchSimilarService.searchSimilar.and.returnValue(of(mockBooks));
    fixture.detectChanges();

    component.onSubmit({ description: 'test' });

    expect(searchSimilarService.searchSimilar).toHaveBeenCalledWith('test');
    expect(component.books).toEqual(mockBooks);
    expect(component.searchButtonText).toBe('Search');
    expect(component.searching).toBe(false);
  });

  it('should handle error and reset searchButtonText on failed search', () => {
    searchSimilarService.searchSimilar.and.returnValue(throwError('error'));
    fixture.detectChanges();

    component.onSubmit({ description: 'test' });

    expect(searchSimilarService.searchSimilar).toHaveBeenCalledWith('test');
    expect(component.books).toEqual([]);
    expect(component.searchButtonText).toBe('Search');
    expect(component.searching).toBe(false);
  });
});
