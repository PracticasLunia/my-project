import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { GetService } from '../../services/book/get/get.service';
import { GetService as GetCategoryService } from '../../services/category/get/get.service';
import { DownloadService } from '../../services/download/download.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../models/book';
import { Category } from '../../models/category';
import download from 'downloadjs';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Route } from '@angular/router';

@Component({
  selector: 'app-book-reader',
  template: '<div>Reader</div>'
})
class MockBookReaderComponent {
  @Input() bookTitle: string = "";
  @Input() fileUrl: string = 'null';
}

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1')
    }
  };
}

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let getBookService: GetService;
  let getCategoryService: GetCategoryService;
  let downloadService: DownloadService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent, MockBookReaderComponent],
      providers: [
        { provide: GetService, useValue: {
          get: jasmine.createSpy('get').and.returnValue(of({category: 1, publicationDate: new Date()}))
        } },
        { provide: GetCategoryService, useValue: {
          get: jasmine.createSpy('get').and.returnValue(of({data: ''}))
        } },
        { provide: DownloadService, useValue: {
          download: jasmine.createSpy('download').and.returnValue(of({data: ''}))
        } },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
      imports: [RouterModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    activatedRoute = TestBed.inject(ActivatedRoute)
    getBookService = TestBed.inject(GetService);
    getCategoryService = TestBed.inject(GetCategoryService);
    downloadService = TestBed.inject(DownloadService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.downloadBook();
  });

  it('should fetch book and category on init', () => {
    expect(getBookService.get).toHaveBeenCalledWith('1');
    expect(getCategoryService.get).toHaveBeenCalledWith(1);
  });

  it('should handle error when book is not found', () => {
    (getBookService.get as jasmine.Spy).and.returnValue(throwError('Error'));
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.error).toBe('Error, book not finded');
  });

  it('should download book when downloadBook is called', () => {
    component.downloadBook();
    expect(downloadService.download).toHaveBeenCalledWith('1');
    fixture.detectChanges();
  });

  it('should not download book if isbn is empty', () => {
    (activatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);
    component.ngOnInit();
    component.downloadBook();
    expect(downloadService.download).not.toHaveBeenCalled();
  });
});
