import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FindService } from '../../services/book/find/find.service';
import { find, of, take } from 'rxjs';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DeleteService } from '../../services/book/delete/delete.service';


@Component({
  selector: 'app-navbar',
  template: '<div>Navbar</div>'
})
class MockNavbarComponent {}

@Component({
  selector: 'app-verify-book-modal',
  template: '<div>Verify Book Modal</div>'
})
class MockVerifyBookModalComponent {
  @Input() bookName: string = "";
  @Input() bookId: number = -1;
}

describe('BookListComponent', () => {
  let component: BookListComponent;
  let findService: FindService;
  let deleteService: DeleteService;
  let fixture: ComponentFixture<BookListComponent>;
  const testBooks = [
    {title: 'test1', author: 'test1', isbn: '1'},
    {title: 'test2', author: 'test2', isbn: '2'},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent, MockNavbarComponent, MockVerifyBookModalComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers:[
        { provide: FindService, useValue: {find: jasmine.createSpy('find').and.returnValue(of(testBooks))}},
        { provide: DeleteService, useValue: {delete: jasmine.createSpy('delete').and.returnValue(of(void 1))}}
      ]
    })
    .compileComponents();

    findService = TestBed.inject(FindService);
    deleteService = TestBed.inject(DeleteService);
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load book list on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(findService.find).toHaveBeenCalled();
    expect(component.bookList.length).toBe(2);
    expect(component.bookList[0].isbn).toBe('1');
    expect(component.bookList[0].title).toBe('test1');
  });

  it('should search books', () => {
    component.searchTitle = 'test1';
    component.searchAuthor = 'test1';
    component.searchBooks();
    fixture.detectChanges();

    expect(findService.find).toHaveBeenCalledWith('test1', 'test1');
    expect(component.bookList.length).toBe(2);
    expect(component.bookList[0].isbn).toBe('1');
    expect(component.bookList[0].title).toBe('test1');
    expect(component.bookList[0].author).toBe('test1');
  });

  it('should delete book', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.deleteBook('1');
    fixture.detectChanges();

    expect(deleteService.delete).toHaveBeenCalled();
    expect(deleteService.delete).toHaveBeenCalledWith('1');
  });
});

