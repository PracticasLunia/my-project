import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GetService } from '../../../shared/services/book/get/get.service';
import { UpdateService } from '../../services/book/update/update.service';
import { CreateService } from '../../services/book/create/create.service';
import { GetAllService } from '../../services/category/getAll/getAll.service';
import { GetAllService as GetAllTagService } from '../../services/tag/getAll/getAll.service';
import { DeleteService } from '../../services/category/delete/delete.service';
import { DeleteService as DeleteTagService } from '../../services/tag/delete/delete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { Category } from '../../../shared/models/category';
import { Book } from '../../../shared/models/book';

@Component({
  selector: 'app-admin-navbar',
  template: '<div>Navbar</div>'
})
class MockNavbarComponent {}

@Component({
  selector: 'app-new-category-modal',
  template: '<div>New Category Modal</div>'
})
class MockNewCategoryModalComponent {
  @Input() categoryId: number = -1;
}

@Component({
  selector: 'app-new-tag-modal',
  template: '<div>New Category Modal</div>'
})
class MockNewTagModalComponent {
  @Input() tags: Tag[] = [];
}

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let getService: jasmine.SpyObj<GetService>;
  let updateService: jasmine.SpyObj<UpdateService>;
  let createService: jasmine.SpyObj<CreateService>;
  let getAllCategoriesService: jasmine.SpyObj<GetAllService>;
  let getAllTagsService: jasmine.SpyObj<GetAllTagService>;
  let deleteCategoryService: jasmine.SpyObj<DeleteService>;
  let deleteTagService: jasmine.SpyObj<DeleteTagService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const getServiceSpy = jasmine.createSpyObj(GetService, ['get']);
    const updateServiceSpy = jasmine.createSpyObj(UpdateService, ['update']);
    const createServiceSpy = jasmine.createSpyObj(CreateService, ['create']);
    const getAllCategoriesServiceSpy = jasmine.createSpyObj(GetAllService, ['getAll']);
    const getAllTagsServiceSpy = jasmine.createSpyObj(GetAllTagService, ['getAll']);
    const deleteCategoryServiceSpy = jasmine.createSpyObj(DeleteService, ['delete']);
    const deleteTagServiceSpy = jasmine.createSpyObj(DeleteTagService, ['delete']);

    await TestBed.configureTestingModule({
      declarations: [BookFormComponent, MockNavbarComponent, MockNewCategoryModalComponent, MockNewTagModalComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, RouterTestingModule.withRoutes(
        [{path: 'books', redirectTo: ''}]
      )],
      providers: [
        { provide: GetService, useValue: getServiceSpy },
        { provide: UpdateService, useValue: updateServiceSpy },
        { provide: CreateService, useValue: createServiceSpy },
        { provide: GetAllService, useValue: getAllCategoriesServiceSpy },
        { provide: GetAllTagService, useValue: getAllTagsServiceSpy },
        { provide: DeleteService, useValue: deleteCategoryServiceSpy },
        { provide: DeleteTagService, useValue: deleteTagServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('') } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    getService = TestBed.inject(GetService) as jasmine.SpyObj<GetService>;
    updateService = TestBed.inject(UpdateService) as jasmine.SpyObj<UpdateService>;
    createService = TestBed.inject(CreateService) as jasmine.SpyObj<CreateService>;
    getAllCategoriesService = TestBed.inject(GetAllService) as jasmine.SpyObj<GetAllService>;
    getAllTagsService = TestBed.inject(GetAllTagService) as jasmine.SpyObj<GetAllTagService>;
    deleteCategoryService = TestBed.inject(DeleteService) as jasmine.SpyObj<DeleteService>;
    deleteTagService = TestBed.inject(DeleteTagService) as jasmine.SpyObj<DeleteTagService>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    const categories: Category[] = [];
    const tags: Tag[] = [];
    getAllCategoriesService.getAll.and.returnValue(of(categories));
    getAllTagsService.getAll.and.returnValue(of(tags));
    component.ngOnInit();
    expect(component.bookForm).toBeTruthy();
    expect(component.bookForm.get('title')).toBeTruthy();
  });

  it('should call getService if ISBN is present', () => {
    const book: Book = {
      title: 'New Book',
      author: 'Author',
      isbn: '123456',
      genre: 'Genre',
      publicationDate: new Date(),
      publisher: 'Publisher',
      language: 'Language',
      description: 'Description',
      pageCount: 100,
      coverImage: 'http://example.com/cover.jpg',
      format: 'Format',
      availability: 'Available',
      category: null,
      Tags: [{
        id: 1,
        BookTag: {
          id: 23,
        }
      }],
      averageRating: 4.5,
      ratingCount: 10,
      summary: 'test',
    };
    getService.get.and.returnValue(of(book));
    (activatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue('123456');
    const categories: Category[] = [];
    const tags: Tag[] = [];
    getAllCategoriesService.getAll.and.returnValue(of(categories));
    getAllTagsService.getAll.and.returnValue(of(tags));

    component.ngOnInit();

    expect(getService.get).toHaveBeenCalledWith('123456');
    expect(component.bookForm.value.title).toBe('New Book');
  });

  it('should load categories and tags on init', () => {
    const categories: Category[] = [{ id: 1, name: 'Fiction', description: 'asd' }];
    const tags: Tag[] = [{ id: 1, name: 'Tag1', description: '' }];
    getAllCategoriesService.getAll.and.returnValue(of(categories));
    getAllTagsService.getAll.and.returnValue(of(tags));

    component.ngOnInit();

    expect(component.categories).toEqual(categories);
    expect(component.tags).toEqual(tags);
  });

  it('should handle form submission for creating a book', () => {
    spyOn(router, 'navigate');
    const categories: Category[] = [{ id: 1, name: 'Fiction', description: 'asd' }];
    const tags: Tag[] = [{ id: 1, name: 'Tag1', description: '' }];
    getAllCategoriesService.getAll.and.returnValue(of(categories));
    getAllTagsService.getAll.and.returnValue(of(tags));
    component.ngOnInit();
    component.bookForm.setValue({
      title: 'New Book',
      author: 'Author',
      isbn: '123456',
      genre: 'Genre',
      publicationDate: '2022-01-01',
      publisher: 'Publisher',
      language: 'Language',
      description: 'Description',
      pageCount: 100,
      coverImage: 'http://example.com/cover.jpg',
      format: 'Format',
      availability: 'Available',
      category: 'null',
      averageRating: 4.5,
      ratingCount: 10,
      summary: 'test',
    });

    createService.create.and.returnValue(of(void 1));
    component.onSubmit();

    expect(createService.create).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/books']);
  });

  it('should handle form submission for updating a book', () => {
    spyOn(router, 'navigate');
    (activatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue('123456');
    const book: Book = {
      title: 'New Book',
      author: 'Author',
      isbn: '123456',
      genre: 'Genre',
      publicationDate: new Date(),
      publisher: 'Publisher',
      language: 'Language',
      description: 'Description',
      pageCount: 100,
      coverImage: 'http://example.com/cover.jpg',
      format: 'Format',
      availability: 'Available',
      category: 0,
      Tags: [{
        id: 1,
        BookTag: {
          id: 23,
        }
      }],
      summary: '',
      averageRating: 4.5,
      ratingCount: 10,
    };
    getService.get.and.returnValue(of(book));
    const categories: Category[] = [{ id: 1, name: 'Fiction', description: 'asd' }];
    const tags: Tag[] = [{ id: 1, name: 'Tag1', description: '' }];
    getAllCategoriesService.getAll.and.returnValue(of(categories));
    getAllTagsService.getAll.and.returnValue(of(tags));
    component.ngOnInit();
    component.bookForm.setValue({
      title: 'Updated Book',
      author: 'Author',
      isbn: '123456',
      genre: 'Genre',
      publicationDate: '2022-01-01',
      publisher: 'Publisher',
      language: 'Language',
      description: 'Description',
      pageCount: 100,
      coverImage: 'http://example.com/cover.jpg',
      format: 'Format',
      availability: 'Available',
      category: null,
      averageRating: 4.5,
      ratingCount: 10,
      summary: 'test',
    });
    let event = new SubmitEvent("")
    component.enableImport(event)

    updateService.update.and.returnValue(of(void 1));
    component.onSubmit();

    expect(updateService.update).toHaveBeenCalledWith('123456', jasmine.any(Object));
    expect(router.navigate).toHaveBeenCalledWith(['/books']);
  });

  it('should add and delete selected tags', () => {
    const categories: Category[] = [{ id: 1, name: 'Fiction', description: 'asd' }];
    const tags: Tag[] = [{ id: 1, name: 'Tag1', description: '' }];
    getAllCategoriesService.getAll.and.returnValue(of(categories));
    getAllTagsService.getAll.and.returnValue(of(tags));
    component.ngOnInit();
    fixture.detectChanges();

    component.onChangeTag(tags[0]);
    fixture.detectChanges();
    expect(component.selectedTags.length).toBe(1);

    component.onChangeTag(tags[0]);
    fixture.detectChanges();
    expect(component.selectedTags.length).toBe(0);
  })

  it('should get selected category correctly', () => {
    const categories: Category[] = [{ id: 1, name: 'Fiction', description: 'asd' }];
    const tags: Tag[] = [{ id: 1, name: 'Tag1', description: '' }];
    getAllCategoriesService.getAll.and.returnValue(of(categories));
    getAllTagsService.getAll.and.returnValue(of(tags));
    createService.create.and.returnValue(of(void 1));
    component.ngOnInit();
    fixture.detectChanges();

    component.bookForm.patchValue({
      title: 'Updated Book',
      pageCount: 100,
      coverImage: 'http://example.com/cover.jpg',
      format: 'Format',
      availability: 'Available',
      category: 'null',
      averageRating: 4.5,
      ratingCount: 10,
      summary: 'test',
    });

    let cat = component.getSelectedCategory();
    expect(cat).toBe(-1);

    component.bookForm.patchValue({
      title: 'Updated Book',
      pageCount: 100,
      coverImage: 'http://example.com/cover.jpg',
      format: 'Format',
      availability: 'Available',
      category: 1,
      averageRating: 4.5,
      ratingCount: 10,
      summary: 'test',
    });
    fixture.detectChanges();
    component.onSubmit();

    cat = component.getSelectedCategory();
    expect(cat).toBe(1);
  })

  it('should delete selected tags and categories using the services', () => {
    const categories: Category[] = [{ id: 1, name: 'Fiction', description: 'asd' }];
    const tags: Tag[] = [{ id: 1, name: 'Tag1', description: '' }];
    getAllCategoriesService.getAll.and.returnValue(of(categories));
    getAllTagsService.getAll.and.returnValue(of(tags));
    deleteCategoryService.delete.and.returnValue(of(void 1));
    deleteTagService.delete.and.returnValue(of(void 1));
    component.ngOnInit();

    component.deleteSelectedCategory();
    component.deleteSelectedTags();

    component.selectedTags = tags;
    component.bookForm.setValue({
      title: 'New Book',
      author: 'Author',
      isbn: '123456',
      genre: 'Genre',
      publicationDate: '2022-01-01',
      publisher: 'Publisher',
      language: 'Language',
      description: 'Description',
      pageCount: 100,
      coverImage: 'http://example.com/cover.jpg',
      format: 'Format',
      availability: 'Available',
      category: 1,
      averageRating: 4.5,
      ratingCount: 10,
      summary: 'test',
    });

    component.deleteSelectedCategory();
    component.deleteSelectedTags();

    expect(deleteCategoryService.delete).toHaveBeenCalled()
    expect(deleteTagService.delete).toHaveBeenCalled()
  });
});
